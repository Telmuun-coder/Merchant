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
import {UserState} from '../../Context/UserState';
import {Picker} from '@react-native-community/picker';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const SalbarNemeh = (props) => {
  const [mark, setMarker] = useState([]);
  const userState = useContext(UserState);
  const [service, setService] = useState('Үсчин');

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
        {/* {userState.who === 'org' && ( */}
        <View style={styles.item}>
          <Text style={styles.itemText}>БАЙГУУЛЛАГЫН РЕГИСТЕР</Text>
          <TextInput
            onChangeText={(t) => null}
            value="935852"
            // onSubmitEditing={Keyboard.dismiss}
            style={styles.input}
          />
        </View>
        {/* )} */}
        {/* {userState.who === 'per' && (
          <> */}
        <View style={styles.item}>
          <Text style={styles.itemText}>ҮЙЛЧИЛГЭЭНИЙ НЭР</Text>
          <TextInput
            onChangeText={(t) => null}
            value="Гоо Салон"
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
            onChangeText={(t) => null}
            value="7022-5543"
            // onSubmitEditing={Keyboard.dismiss}
            style={styles.input}
          />
        </View>
        <View style={styles.item}>
          <Text style={styles.itemText}>И-МЭЙЛ ХАЯГ</Text>
          <TextInput
            onChangeText={(t) => null}
            value="goosalon@gmail.com"
            // onSubmitEditing={Keyboard.dismiss}
            style={styles.input}
          />
        </View>
        {/* </>
        )} */}
        <View style={styles.container}>
          <MapView
            provider={PROVIDER_GOOGLE} // remove if not using Google Maps
            style={styles.map}
            // showsUserLocation={true} //idk
            // followsUserLocation={true} //idk
            onPress={(e) => {
              setMarker([{latlng: e.nativeEvent.coordinate}]);
              alert(e.nativeEvent.coordinate.latitude);
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
            onChangeText={(t) => null}
            value="Улаанбаатар хот, БЗД, 1-р хороо, Баянзүрх зах, Гоо салон"
            multiline
            // onSubmitEditing={Keyboard.dismiss}
            style={styles.input}
          />
        </View>
        <View style={{marginVertical: 30}}>
          <Button
            name="Салбар бүртгүүлэх"
            method={() => {
              props.navigation.pop();
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

export default SalbarNemeh;
