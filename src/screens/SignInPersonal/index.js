import React, {useState, useContext} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableHighlight,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
// import AppContext from '../AppContext.js';
import Button from '../../components/Button';
import {AuthContext} from '../../Context/AuthContext';
// import {UserState} from '../../Context/UserState';
const Login = (props) => {
  const [registerNumber, setRegisterNumber] = useState('BB88969796');
  const [password, setPassword] = useState('pass');
  const [err, setErr] = useState(false);
  const {SignIn} = useContext(AuthContext);
  // const userState = useContext(UserState);

  return (
    <View style={styles.MainContainer}>
      {err && (
        <Text style={{color: 'red'}}>
          Таны РЕГИСТР эсвэл НУУЦ ҮГ буруу байна.
        </Text>
      )}
      {/* <Text style={{color: 'red'}}>{userState.who}</Text> */}
      <View style={styles.item}>
        <Icon
          style={{marginRight: '5%'}}
          name="md-person"
          size={20}
          color="orange"
        />
        <View>
          <Text style={styles.itemText}>РЕГИСТРИЙН ДУГААР</Text>
          <TextInput
            value={registerNumber}
            onChangeText={(text) => setRegisterNumber(text)}
            style={styles.input}
            placeholder="АА00000000"
          />
        </View>
      </View>
      <View style={styles.item}>
        <Icon
          style={{marginRight: '5%'}}
          name="lock-closed"
          size={20}
          color="orange"
        />
        <View>
          <Text style={styles.itemText}>НУУЦ ҮГ</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            secureTextEntry
            placeholder="нууц үг"
            style={styles.input}
          />
        </View>
      </View>
      <View style={{marginVertical: 15}}>
        <Button
          method={() => {
            SignIn(registerNumber, password, setErr);
          }}
          name="Нэвтрэх"
        />
      </View>
      <TouchableOpacity
        style={{
          marginTop: 80,
          // backgroundColor: 'red',
          width: '60%',
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => props.navigation.push('SignUp')}>
        <Text style={{fontSize: 16, color: 'orange', fontWeight: 'bold'}}>
          Бүртгүүлэх
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export default Login;
const styles = StyleSheet.create({
  MainContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    color: 'grey',
    fontSize: 14,
  },
  item: {
    paddingHorizontal: 20,
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    backgroundColor: 'white',
    // borderColor: '#F6972A',
    width: '80%',
    borderRadius: 8,
  },
  itemText: {
    color: 'grey',
  },
  input: {
    padding: 0,
  },
});
