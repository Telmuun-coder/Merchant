import React, {useEffect, useContext, useState} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  Text,
  SafeAreaView,
  Dimensions,
  StatusBar,
  TouchableHighlight,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// import {UserState} from '../../Context/UserState';
import {AuthContext} from '../../Context/AuthContext';
import Icon from 'react-native-vector-icons/Entypo';
// import AsyncStorage from '@react-native-community/async-storage';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Profile = (props) => {
  // const userState = useContext(UserState);
  const {SignOut} = useContext(AuthContext);
  const [salbars, setSalbars] = useState([
    // 'Goo salon 13',
    // 'Goo salon khoroolol',
    // 'Goo salon',
    // 'Goo salon 5 shar',
    // 'Goo salon 21',
  ]);
  const [info, setInfo] = useState([
    {
      merchantRegister: '000000',
      name: '',
      categoryId: '',
      phoneNumber: '0',
      email: '0',
      latitude: 47.92123,
      longitude: 106.918556,
      address: '',
      status: 'Inactive',
    },
  ]);
  // const getInfo = async () => {
  //   let infor = await AsyncStorage.getItem('salbarMedeelel');
  //   setInfo(JSON.parse(infor));
  //   let names = JSON.parse(infor).map((e) => e.name);
  //   setSalbars(names);
  // };
  // useEffect(() => {
  //   getInfo();
  // }, []);
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor="orange"></StatusBar>
      <View style={styles.head}>
        <Text style={styles.headTitle}>ХУВИЙН МЭДЭЭЛЭЛ</Text>
        <TouchableOpacity style={styles.logOut} onPress={() => SignOut()}>
          <Icon color="orange" size={20} name="log-out" />
          <Text style={{fontSize: 12}}>Log out</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}>
        {info[0].merchantRegister && (
          <View style={styles.item}>
            <Text style={styles.title}>БАЙГУУЛЛАГЫН РЕГИСТЕР</Text>
            <Text style={styles.name}>{info[0].merchantRegister}</Text>
          </View>
        )}
        <View style={styles.item}>
          <Text style={styles.title}>ҮЙЛЧИЛГЭЭНИЙ НЭР</Text>
          <Text style={styles.name}>{info[0].name}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>ҮЙЛЧИЛГЭЭНИЙ ЧИГЛЭЛ</Text>
          <Text style={styles.name}>{info[0].categoryId}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>УТАС</Text>
          <Text style={styles.name}>{info[0].phoneNumber}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>И-МЭЙЛ ХАЯГ</Text>
          <Text style={styles.name}>{info[0].email}</Text>
        </View>
        <View style={styles.mapContainer}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            // showsUserLocation={true} //idk
            // followsUserLocation={true} //idk
            // onPress={(e) => {
            //   setMarker([{latlng: e.nativeEvent.coordinate}]);
            //   // alert(e.nativeEvent.coordinate.latitude);
            // }}
            region={{
              latitude:
                typeof info[0].latitude === 'undefined'
                  ? info[0].latitude
                  : parseFloat(info[0].latitude),
              longitude:
                typeof info[0].latitude === 'undefined'
                  ? info[0].longitude
                  : parseFloat(info[0].longitude),
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <MapView.Marker
              coordinate={{
                latitude:
                  typeof info[0].latitude === 'undefined'
                    ? info[0].latitude
                    : parseFloat(info[0].latitude),
                longitude:
                  typeof info[0].latitude === 'undefined'
                    ? info[0].longitude
                    : parseFloat(info[0].longitude),
              }}
            />
          </MapView>
        </View>
        <View style={[styles.item, {marginTop: 0}]}>
          <Text style={styles.title}>БАЙГУУЛЛАГЫН ХАЯГ</Text>
          <Text multiline style={styles.name}>
            {info[0].address}
          </Text>
        </View>
        <View style={styles.footer}>
          <Text
            style={{
              color: 'gray',
              fontSize: 14,
              alignSelf: 'center',
              marginBottom: 10,
            }}>
            САЛБАРУУД
          </Text>
          <View style={styles.salbarContainer}>
            <TouchableOpacity
              onPress={() => props.navigation.push('SalbarNemeh')}>
              <Text style={styles.salbarNemeh}>
                <Icon color="orange" size={24} name="circle-with-plus" />
              </Text>
            </TouchableOpacity>
            {salbars.map(
              (e, i) =>
                i !== 0 && (
                  <TouchableOpacity
                    key={i}
                    onPress={() =>
                      props.navigation.push('Salbar', {
                        heatTitle: e,
                        info: info[i],
                      })
                    }>
                    <Text style={styles.salbar}>
                      <Text style={styles.salbarName}>{e}</Text>
                    </Text>
                  </TouchableOpacity>
                ),
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  logOut: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  head: {
    marginTop: -3,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
    flexDirection: 'row',
    width: windowWidth * 1.1,
    height: windowHeight * 0.07,
    elevation: 5,
    backgroundColor: 'white',
  },
  headTitle: {
    marginLeft: windowWidth * 0.25,
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
  },
  salbarContainer: {
    width: '100%',
    height: 'auto',
    // backgroundColor: 'red',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  salbarName: {
    color: '#717171',
  },
  salbar: {
    margin: 5,
    padding: 8,
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 20,
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  footer: {
    padding: 10,
    backgroundColor: '#F5F5F5',
    marginTop: 30,
    width: windowWidth,
    height: 'auto',
  },
  mapContainer: {
    // ...StyleSheet.absoluteFillObject,
    height: 200,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  item: {
    marginTop: 15,
    width: '80%',
    borderBottomWidth: 1,
    borderBottomColor: '#DBD0D0',
  },
  title: {
    color: 'gray',
    fontSize: 12,
    textAlign: 'center',
  },
  name: {
    textAlign: 'center',
    fontSize: 14,
  },
  Container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  salbarNemeh: {
    margin: 5,
    paddingHorizontal: 30,
    paddingVertical: 4.5,
    alignSelf: 'flex-start',
    backgroundColor: 'white',
    borderRadius: 20,
  },
});

export default Profile;
