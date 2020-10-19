import React, {useState, useContext, useEffect} from 'react';
import 'react-native-gesture-handler';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Dimensions,
  // AsyncStorage,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import Profile from './src/screens/Profile';
import Notification from './src/screens/Notification';
import Scann from './src/screens/Scann';
//import SignUp from './src/screens/SignUp';
//import First from './src/screens/First';
import SignUp from './src/screens/SignUpAnh';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
import SignInPersonal from './src/screens/SignInPersonal';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MatIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import {NavigationContainer} from '@react-navigation/native';
import {AuthContext} from './src/Context/AuthContext';
import AsyncStorage from '@react-native-community/async-storage';
import UserStore, {UserState} from './src/Context/UserState';
// import Navi from './src/screens/Navi';
import SalbarNemeh from './src/screens/SalbarNemeh';
import Salbar from './src/screens/Salbar';
import Loader from './src/components/Loader';
import axios from 'axios';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const Bottom = createBottomTabNavigator();
const RootStack = createStackNavigator();
const AuthStack = createStackNavigator();

const Auth = () => (
  <AuthStack.Navigator
  // headerMode="none"
  >
    <AuthStack.Screen
      options={{title: 'Нэвтрэх', headerTitleAlign: 'center'}}
      name="SignIn"
      component={SignInPersonal}
    />
    <AuthStack.Screen
      options={{title: 'Бүртгүүлэх', headerTitleAlign: 'center'}}
      name="SignUp"
      component={SignUp}
    />
  </AuthStack.Navigator>
);

const Tab = () => (
  <Bottom.Navigator
    initialRouteName="Scanner"
    screenOptions={({route}) => ({
      tabBarIcon: ({focused, color, size}) => {
        let iconName;
        if (route.name === 'Profile') {
          iconName = 'account';
        } else if (route.name === 'Scanner') {
          return <MatIcon name="qrcode-scan" size={29} color={color} />;
        } else iconName = 'bell';

        return <MatIcon name={iconName} size={size} color={color} />;
      },
    })}
    tabBarOptions={{
      style: {height: windowHeight * 0.07},
      activeTintColor: '#F6972A',
      inactiveTintColor: 'grey',
      // showLabel: false,
    }}>
    <Bottom.Screen name="Profile" component={Profile} />
    <Bottom.Screen name="Scanner" component={Scann} />
    <Bottom.Screen name="Notifications" component={Notification} />
  </Bottom.Navigator>
);

const Stack = createStackNavigator();
const Navi = () => {
  return (
    <Stack.Navigator initialRouteName="Tab">
      <Stack.Screen name="Tab" component={Tab} options={{headerShown: false}} />
      <Stack.Screen
        name="SalbarNemeh"
        component={SalbarNemeh}
        options={{
          title: 'Салбар нэмэх',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Salbar"
        component={Salbar}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

const App = () => {
  const [token, setToken] = useState(false);
  const [vote, setVote] = useState(null);
  const userState = useContext(UserState);
  const [loading, setLoading] = useState(false);
  let salbarMedeelel;
  const requestPermissions = async () => {
    if (Platform.OS === 'ios') {
      Geolocation.requestAuthorization();
      Geolocation.setRNConfiguration({
        skipPermissionRequests: false,
        authorizationLevel: 'whenInUse',
      });
    }

    if (Platform.OS === 'android') {
      await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      );
    }
  };

  const authContext = React.useMemo(() => {
    return {
      SignIn: async (registerNumber, password, setErr) => {
        const data = {
          registrationNumber: registerNumber,
          password: password,
        };
        const options = {
          method: 'POST',
          headers: {'content-type': 'application/json'},
          data,
          url: 'http://api.minu.mn/anhaar/user/signIn',
        };
        setLoading(true);
        try {
          const res = await axios(options);
          if (res.data.message === 'Алдаа гарлаа') setErr(true);
          else {
            console.log('token:' + res.data.entity);
            await AsyncStorage.setItem('token', res.data.entity);
            await AsyncStorage.setItem('username', registerNumber);
            //Салбаруудын мэдээллийг татаж авч байна
            axios.defaults.headers.common = {
              Authorization: `Bearer ${res.data.entity}`,
            };
            salbarMedeelel = await axios
              .get('http://api.minu.mn/anhaar/merchant/get')
              .then((res) => {
                //alert(res.data.entity);
                return res.data.entity;
              });
            await AsyncStorage.setItem(
              'salbarMedeelel',
              JSON.stringify(salbarMedeelel),
            );
            //Хэрхэн салбаруудын мэдээллээ Storage-с авах
            // let example = await AsyncStorage.getItem('salbarMedeelel');
            // example = JSON.parse(example);
            // alert(example[example.length - 1].merchantRegister);
          }
        } catch (e) {
          if (e.message === 'Network Error')
            alert('Та интернет холболтоо шалгана уу.');
          console.log('Алдаа гарлаашүүдээ ' + e.message);
        } finally {
          setLoading(false);
          setToken(await AsyncStorage.getItem('token'));
          //setToken('token');
        }
      },
      SignOut: async () => {
        setLoading(true);
        await AsyncStorage.multiRemove(['token', 'username', 'salbarMedeelel']);
        setLoading(false);
        setToken(null);
      },
      SignUp: () => {
        setToken('sad');
      },
      // Voting: (a) => {
      //   setVote(a);
      // },
    };
  }, []);
  const logged = async () => {
    const tokenn = await AsyncStorage.getItem('token');
    if (tokenn) setToken(tokenn);
  };
  useEffect(() => {
    logged();
    requestPermissions();
  }, []);

  return (
    <AuthContext.Provider value={authContext}>
      {/* <UserStore> */}
      <NavigationContainer>
        <RootStack.Navigator headerMode="none">
          {
            // vote === null ? (
            //   <RootStack.Screen name="First" component={First} />
            // ) :
            token ? (
              <RootStack.Screen name="Navi" component={Navi} />
            ) : (
              <RootStack.Screen name="Auth">
                {() => (
                  <>
                    <Auth />
                    {loading && <Loader visible={loading} />}
                  </>
                )}
              </RootStack.Screen>
            )
          }
        </RootStack.Navigator>
      </NavigationContainer>
      {/* </UserStore> */}
    </AuthContext.Provider>
  );
};

export default App;
