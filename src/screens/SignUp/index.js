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
  TextInput,
} from 'react-native';
import Button from '../../components/Button';
import Icon from 'react-native-vector-icons/EvilIcons';
import {AuthContext} from '../../Context/AuthContext';
import {UserState} from '../../Context/UserState';
import {Picker} from '@react-native-community/picker';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import axios from 'axios';
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const SignUp = (props) => {
  const {SignUp} = React.useContext(AuthContext);
  const userState = useContext(UserState);
  const [service, setService] = useState('Үсчин');
  const [serName, setSerName] = useState('Гоо Салон');
  const [register, setRegister] = useState('123123');
  const [phone, setPhone] = useState('7011-7711');
  const [email, setEmail] = useState('goosalon@gmail.com');
  const [mark, setMarker] = useState([]);
  const [address, setAdress] = useState(
    'Улаанбаатар хот, БЗД, 1-р хороо, Баянзүрх зах, Гоо салон',
  );

  // const Submit = async () => {
  //   let data;
  //   const url = 'http://api.minu.mn/anhaar/merchant/create';
  //   if (userState.who === 'org')
  //     data = {
  //       merchantRegister: register + '',
  //       latitude: mark[0].latlng.latitude + '',
  //       longitude: mark[0].latlng.longitude + '',
  //       address,
  //     };
  //   else
  //     data = {
  //       name: serName,
  //       categoryId: service,
  //       phoneNumber: phone,
  //       email,
  //       latitude: mark[0].latlng.latitude + '',
  //       longitude: mark[0].latlng.longitude + '',
  //       address,
  //     };
  //   const options = {
  //     method: 'POST',
  //     headers: {'content-type': 'application/json'},
  //     data: data,
  //     url: 'http://api.minu.mn/anhaar/merchant/create,
  //   };
  //   try {
  //     // console.log(
  //     //   data.merchantRegister +
  //     //     '\n' +
  //     //     data.latitude +
  //     //     '\n' +
  //     //     data.longitude +
  //     //     '\n' +
  //     //     data.address,
  //     // );
  //     const res = await axios(options);
  //     console.log(res.data.status);
  //   } catch (error) {
  //     if (error.response) {
  //       // The request was made and the server responded with a status code
  //       // that falls out of the range of 2xx
  //       console.log('respose====>');
  //       console.log(error.response.data);
  //       console.log(error.response.status);
  //       console.log(error.response.headers);
  //     } else if (error.request) {
  //       // The request was made but no response was received
  //       // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
  //       // http.ClientRequest in node.js
  //       console.log('request====>');
  //       console.log(error.request);
  //     } else {
  //       // Something happened in setting up the request that triggered an Error
  //       console.log('Error', error.message);
  //     }
  //     console.log(error.config);
  //   }
  // };

  return (
    <SafeAreaView style={styles.Container}>
      <ScrollView
        contentContainerStyle={{
          justifyContent: 'flex-start',
          alignItems: 'center',
        }}
        style={{
          flex: 1,
          backgroundColor: 'white',
        }}>
        <StatusBar backgroundColor="orange" />
        {userState.who === 'org' && (
          <View style={styles.item}>
            <Text style={styles.itemText}>БАЙГУУЛЛАГЫН РЕГИСТЕР</Text>
            <TextInput
              onChangeText={(t) => setRegister(t)}
              value={register}
              style={styles.input}
            />
          </View>
        )}
        {userState.who === 'per' && (
          <>
            <View style={styles.item}>
              <Text style={styles.itemText}>ҮЙЛЧИЛГЭЭНИЙ НЭР</Text>
              <TextInput
                onChangeText={(t) => setSerName(t)}
                value={serName}
                // onSubmitEditing={Keyboard.dismiss}
                style={styles.input}
              />
            </View>
            {/* ----------------------------------------------------------------- */}
            <View style={styles.item}>
              <Text style={styles.itemText}>ҮЙЛЧИЛГЭЭНИЙ ЧИГЛЭЛ</Text>
              <Picker
                selectedValue={service}
                style={{height: 50, width: 150}}
                onValueChange={(itemValue, itemIndex) => setService(itemValue)}>
                <Picker.Item label="Үсчин" value="Үсчин" />
                <Picker.Item label="Мүсчин" value="Мүсчин" />
                <Picker.Item label="Тэгээд" value="Тэгээд" />
                <Picker.Item label="Өөр" value="Өөр" />
                <Picker.Item label="Юу" value="Юу" />
                <Picker.Item label="Байдгин" value="Байдгин" />
                <Picker.Item label="Тэ" value="Тэ" />
              </Picker>
            </View>
            {/* ----------------------------------------------------------------- */}
            <View style={styles.item}>
              <Text style={styles.itemText}>УТАС</Text>
              <TextInput
                onChangeText={(t) => setPhone(t)}
                value={phone}
                style={styles.input}
              />
            </View>
            <View style={styles.item}>
              <Text style={styles.itemText}>И-МЭЙЛ ХАЯГ</Text>
              <TextInput
                onChangeText={(t) => setEmail(t)}
                value={email}
                style={styles.input}
              />
            </View>
          </>
        )}
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            // showsUserLocation={true} //idk
            // followsUserLocation={true} //idk
            onPress={(e) => {
              setMarker([{latlng: e.nativeEvent.coordinate}]);
              // alert(mark[0].latlng.longitude);
            }}
            region={{
              latitude: 47.92123,
              longitude: 106.918556,
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            {mark.map((marker, i) => (
              <MapView.Marker key={i} coordinate={marker.latlng} />
            ))}
          </MapView>
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>БАЙГУУЛЛАГЫН ХАЯГ</Text>
          <TextInput
            onChangeText={(t) => setAdress(t)}
            value={address}
            multiline
            style={styles.input}
          />
        </View>
        <View style={{marginVertical: 30}}>
          <Button
            name="Бүртгүүлэх"
            method={() => {
              Submit();
              // SignUp();
              // props.navigation.pop();
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    height: 220,
    width: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginVertical: 10,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  Container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  zuragOruulah: {
    marginTop: 15,
    elevation: 15,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
    // backgroundColor: 'purple',
    height: windowWidth * 0.35,
    width: windowWidth * 0.35,
    borderRadius: windowWidth * 0.35,
  },
  avatar: {
    width: windowWidth * 0.35,
    height: windowWidth * 0.35,
    borderRadius: windowWidth * 0.35,
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
  },
  item: {
    borderBottomColor: '#DBD0D0',
    borderBottomWidth: 1,
    marginHorizontal: 15,
    marginVertical: 1,
    width: '90%',
  },
  itemText: {
    marginTop: 5,
    color: 'grey',
    fontSize: 12,
  },
  input: {
    padding: 0,
    fontSize: 16,
    paddingHorizontal: 10,
  },
});

export default SignUp;
