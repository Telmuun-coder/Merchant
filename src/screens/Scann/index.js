'use strict';
import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  StatusBar,
  Image,
} from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import Mood from '../../components/Modal';
import AntiIcon from 'react-native-vector-icons/AntDesign';
import Button from '../../components/Button';
import axios from '../../../axios';
import AsyncStorage from '@react-native-community/async-storage';
import {useSafeArea} from 'react-native-safe-area-context';
import Geolocation from 'react-native-geolocation-service';

const ScanScreen = () => {
  let bairlal = {};
  let cardNumber = 0;
  const [modalError, setModalError] = useState(false);
  const [modal, setModal] = useState(false);
  const [modalLoading, setModalLoading] = useState(true);
  const [tolov, setTolov] = useState('normal');
  const [state, setState] = useState(true);
  const [token, setToken] = useState(null);
  const [name, setName] = useState('name');
  const [register, setRegister] = useState('AA');
  const [info, setInfo] = useState([
    {
      id: '5f226a12de177b39219d2a9f',
      latitude: 47.92123,
      longitude: 106.918556,
    },
  ]);

  const getCoord = () => {
    Geolocation.getCurrentPosition(
      (data) => {
        bairlal = {
          latitude: data.coords.latitude,
          longitude: data.coords.longitude,
        };
        console.log('lati: ', bairlal.latitude);
      },
      (error) => {
        alert(
          'Алдаа гарлаа. Та гар утасныхаа Location буюу GPS-г асаан эсэхээ шалгаад дахин оролдоно уу.',
        );
        console.log(error);
      },
      {enableHighAccuracy: true, timeout: 2000, maximumAge: 3600000},
    );
  };

  const getInfo = async () => {
    setToken(await AsyncStorage.getItem('token'));
    let infor = await AsyncStorage.getItem('salbarMedeelel');
    setInfo(JSON.parse(infor));
    getCoord();
  };
  const check = async () => {
    const data = {
      merchantId: info[0].id,
      latitude: bairlal.latitude,
      longitude: bairlal.longitude,
      cardNo: cardNumber,
    };
    setModalLoading(true);
    try {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post('/anhaar/merchant/checkUser', data).then((res) => {
        setTolov(res.data.entity.status);
        setName(res.data.entity.givenName);
        setRegister(res.data.entity.registrationNumber);
        console.log(res.data.entity);
      });
    } catch (e) {
      setModalError(true);
      console.log('Хэрэглэгч шалгах үед алдаа гарааш: ', e.message);
    } finally {
      setModalLoading(false);
    }
  };
  const introduce = async () => {
    const data = {
      merchantId: info[0].id,
      latitude: bairlal.latitude,
      longitude: bairlal.longitude,
      cardNo: cardNumber,
      status: tolov === 'normal' ? 'Approve' : 'Refuce',
    };
    setModalLoading(true);
    try {
      axios.defaults.headers.common = {
        Authorization: `Bearer ${token}`,
      };
      await axios.post('/anhaar/merchant/setUserLog', data).then((res) => {
        console.log(res.data.entity.message);
      });
    } catch (e) {
      setModalError(true);
      console.log(
        'Хэрэглэгч нэвтрүүлэх || мэдэгдэх үед алдаа гарааш: ',
        e.message,
      );
    } finally {
      setModalLoading(false);
      setModal(false);
      setState(true);
    }
  };

  useEffect(() => {
    getInfo();
  }, []);

  const onSuccess = (e) => {
    cardNumber = e.data;
    setModal(true);
    check();
  };

  let scanner;
  return (
    <View styles={styles.container}>
      <StatusBar backgroundColor="orange" />
      <Mood
        loading={modalLoading}
        show={modal}
        closeModal={() => setModal(!modal)}>
        {modalError ? (
          <>
            <Text style={styles.modalErr}>
              Алдаа гарсан тул та дахин оролдоно уу.
            </Text>
            <Button
              name="Хаах"
              method={() => {
                setModal(false);
                setModalError(false);
              }}
            />
          </>
        ) : state ? (
          <>
            {/* <Image
              source={require('../../Image/pro.jpg')}
              style={styles.image}
            /> */}
            <Text style={styles.nameTitle}>НЭР</Text>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.nameTitle}>РЕГИСТРИЙН ДУГААР</Text>
            <Text style={styles.name}>{register}</Text>
            <Button
              method={() => {
                setState(false);
              }}
              name="Шалгах"
            />
          </>
        ) : tolov === 'normal' ? (
          <>
            <Text style={styles.ModalTitle}>Хэвийн</Text>
            <AntiIcon name="checkcircleo" color="#40C528" size={70} />
            <Button method={() => introduce()} name="Нэвтрүүлэх" />
          </>
        ) : (
          <>
            <Text style={[styles.ModalTitle, {color: '#E64B34'}]}>
              Хэвийн бус
            </Text>
            <AntiIcon name="exclamationcircleo" color="#E64B34" size={70} />
            <Button method={() => introduce()} name="Мэдэгдэх" />
          </>
        )}
      </Mood>
      <QRCodeScanner
        ref={(node) => (scanner = node)}
        // showMarker
        onRead={onSuccess.bind(this)}
        // reactivate={true}
        //cameraType="front"
      />
      <TouchableOpacity
        style={styles.button}
        onPress={() => scanner.reactivate()}>
        <Text style={styles.buttonName}>Дахин уншуулах</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  button: {
    backgroundColor: 'orange',
    marginTop: '130%',
    marginLeft: '10%',
    width: '80%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  buttonName: {
    color: 'white',
    fontSize: 18,
  },
  ModalTitle: {
    marginTop: 30,
    fontSize: 20,
    color: '#40C528',
  },
  image: {width: 120, height: 120, borderRadius: 100},
  nameTitle: {
    color: 'gray',
    fontSize: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  modalErr: {
    color: 'red',
    fontSize: 20,
    textAlign: 'center',
    marginTop: 50,
  },
});

export default ScanScreen;
