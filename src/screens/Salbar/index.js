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
import Iocon from 'react-native-vector-icons/Ionicons';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
// import {UserState} from '../../Context/UserState';
import {AuthContext} from '../../Context/AuthContext';
import Icon from 'react-native-vector-icons/Entypo';
// import AsyncStorage from '@react-native-community/async-storage';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Salbar = (props) => {
  const {heatTitle} = props.route.params;
  const {info} = props.route.params;
  // const userState = useContext(UserState);
  const {SignOut} = useContext(AuthContext);
  const [mark, setMarker] = useState([]);
  //   const [salbars, setSalbars] = useState([
  //     'Goo salon 13',
  //     'Goo salon khoroolol',
  //     'Goo salon',
  //     'Goo salon 5 shar',
  //     'Goo salon 21',
  //   ]);
  return (
    <SafeAreaView style={styles.Container}>
      <StatusBar backgroundColor="orange" />
      <View style={styles.header}>
        <TouchableHighlight
          underlayColor="gray"
          onPress={() => props.navigation.goBack()}
          style={styles.goBack}>
          <Iocon color="black" size={20} name="arrow-back" />
        </TouchableHighlight>
        <Text style={styles.headTitle}>{heatTitle}</Text>
        <TouchableOpacity
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={() => SignOut()}>
          <Icon color="orange" size={20} name="log-out" />
          <Text>Log out</Text>
        </TouchableOpacity>
      </View>
      <ScrollView
        contentContainerStyle={{
          marginTop: 30,
          alignItems: 'center',
        }}>
        {/* {userState.who === 'org' && ( */}
        <View style={styles.item}>
          <Text style={styles.title}>БАЙГУУЛЛАГЫН РЕГИСТЕР</Text>
          <Text style={styles.name}>{info.merchantRegister}</Text>
        </View>
        {/* )} */}
        <View style={styles.item}>
          <Text style={styles.title}>ҮЙЛЧИЛГЭЭНИЙ НЭР</Text>
          <Text style={styles.name}>{info.name}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>ҮЙЛЧИЛГЭЭНИЙ ЧИГЛЭЛ</Text>
          <Text style={styles.name}>{info.categoryId}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>УТАС</Text>
          <Text style={styles.name}>{info.phoneNumber}</Text>
        </View>
        <View style={styles.item}>
          <Text style={styles.title}>И-МЭЙЛ ХАЯГ</Text>
          <Text style={styles.name}>{info.email}</Text>
        </View>
        <View style={styles.mapContainer}>
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
              latitude: parseFloat(info.latitude),
              longitude: parseFloat(info.longitude),
              latitudeDelta: 0.015,
              longitudeDelta: 0.0121,
            }}>
            <MapView.Marker
              coordinate={{
                latitude: parseFloat(info.latitude),
                longitude: parseFloat(info.longitude),
              }}
            />
          </MapView>
        </View>
        <View style={[styles.item, {marginTop: 0}]}>
          <Text style={styles.title}>БАЙГУУЛЛАГЫН ХАЯГ</Text>
          <Text multiline style={styles.name}>
            {info.address}
          </Text>
        </View>
        <View style={styles.footer}>
          {/* <Text
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
            {salbars.map((e, i) => (
              <TouchableOpacity
                key={i}
                onPress={() => props.navigation.push('Salbar')}>
                <Text style={styles.salbar}>
                  <Text style={styles.salbarName}>{e}</Text>
                </Text>
              </TouchableOpacity>
            ))}
          </View> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  goBack: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    borderRadius: 30,
  },
  header: {
    flexDirection: 'row',
    marginTop: -3,
    justifyContent: 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
    width: windowWidth * 1.1,
    height: windowHeight * 0.07,
    elevation: 5,
    backgroundColor: 'white',
  },
  headTitle: {
    fontSize: 20,
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
    // padding: 10,
    // backgroundColor: '#F5F5F5',
    // marginTop: 30,
    width: windowWidth,
    // height: 'auto',
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
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'yellow',
    // width: windowHeight,
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

export default Salbar;
