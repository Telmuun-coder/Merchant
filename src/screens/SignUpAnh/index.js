import React, {Component} from 'react';
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  TextInput,
  Text,
  ScrollView,
  SafeAreaView,
  Dimensions,
  KeyboardAvoidingView,
  //   Picker,
  Keyboard,
  Platform,
} from 'react-native';
import {Picker} from '@react-native-community/picker';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import QRCodeScanner from 'react-native-qrcode-scanner';
import ImagePicker from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/Feather';
import AntiIcon from 'react-native-vector-icons/AntDesign';
import Button from '../../components/Button';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scrollview';
import DatePicker from 'react-native-datepicker';
import axios from '../../../axios';
import Axios from 'axios';
import Loader from '../../components/Loader';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const imagePickerOptions = {
  title: 'Үнэмлэхний зураг оруулах',
  takePhotoButtonTitle: 'Зураг авч оруулах...',
  chooseFromLibraryButtonTitle: 'Зургийн цомгоос сонгох...',
  quality: 1,
  // maxWidth: 500,
  // maxHeight: 150,
};

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      camera: true,
      keyboardActive: false,
      scanned: false,
      CardFront: false,
      wrongPass: false,
      loading: false,
      localUri: 'a',

      cardNo: '',
      cardUri: 'a',
      familyName: '',
      surName: '',
      givenName: '',
      sex: 'Male',
      date: '2000-01-01',
      registrationNumber: '',
      phoneNumber: '',
      password: '',
    };
  }
  onSuccess = (e) => {
    this.setState({cardNo: e.data});
    alert('Амжилттай уншлаа.');
    this.handleCamera();
  };
  handleCamera = () => {
    this.setState({scanned: true, camera: !this.state.camera});
  };
  passwordChecker = (t) => {
    t === this.state.password
      ? this.setState({wrongPass: false})
      : this.setState({wrongPass: true});
  };

  signUp = async () => {
    const datas = {
      cardNo: this.state.cardNo,
      familyName: this.state.familyName,
      surName: this.state.surName,
      givenName: this.state.givenName,
      sex: this.state.sex,
      dateOfBirth: this.state.date,
      registrationNumber: this.state.registrationNumber,
      phoneNumber: this.state.phoneNumber,
      password: this.state.password,
      imageUrl: this.state.cardUri, //"images2.jpg"
    };
    console.log(datas);
    this.setState({loading: true});
    let res = '';
    try {
      res = await axios.post('/anhaar/user/signUp', datas);
      console.log(res.data.message);
      res.data.message !== 'Success' && alert(res.data.message);
    } catch (e) {
      console.log('Алдаа гарлаашүүдээ' + e);
    } finally {
      this.setState({loading: false});
      if (res.data.message === 'Success') {
        this.props.navigation.pop();
      }
    }
  };

  uploadCardFront = async (image_uri) => {
    console.log('uriiiiiiiiiiii: ' + image_uri.type);
    this.setState({loading: true});
    try {
      let uploadImage = new FormData();
      uploadImage.append('file', {
        type: image_uri.type,
        uri: image_uri.uri,
        name: image_uri.fileName,
      });
      //------------------Worked for Meee---------------------------------
      // axios.defaults.headers.post['Content-Type'] = 'multipart/form-data';
      // await axios
      //   .post('anhaar/uploadFile', uploadImage)
      //   .then((response) =>
      //     console.log(response.data.message + '|' + response.data.entity),
      //   );
      //------------------Did not Work---------------------------------------
      // const config = {
      //   url: 'http://api.minu.mn/anhaar/uploadFile',
      //   method: 'POST',
      //   headers: {
      //     'content-type': 'multipart/form-data',
      //   },
      //   data: uploadImage,
      // };
      //const result = await Axios.post(config);
      //------------------------Worked------------------------------------Headergu ajilsan
      await axios({
        // headers: {
        //   'content-type': 'multipart/form-data',
        // },
        method: 'post',
        url: '/anhaar/uploadFile',
        data: uploadImage,
      }).then((response) => {
        if (response.data.message === 'Success')
          this.setState({cardUri: response.data.entity, CardFront: true});
        else alert('Зураг оруулж чадсангүй');
      });
    } catch (e) {
      console.log('Зураг upload хийх үед алдаа гарав ' + e);
    } finally {
      this.setState({loading: false});
    }
  };

  getAvatar = () => {
    ImagePicker.showImagePicker(imagePickerOptions, (res) => {
      if (res.didCancel) console.warn('really');
      else if (res.error) console.warn(res.error);
      else {
        this.uploadCardFront(res);
        this.setState({localUri: res.uri});
      }
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.containerView}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          enabled
          // keyboardVerticalOffset={SCREEN_HEIGHT * 0.1}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <KeyboardAwareScrollView
            style={{flex: 1}}
            //showsVerticalScrollIndicator={false}
          >
            <Loader visible={this.state.loading} />
            <View
              style={{
                // height: SCREEN_HEIGHT * 1.1,
                flex: 1,
                // backgroundColor: 'green',
                width: SCREEN_WIDTH,
                // paddingHorizontal: 30,
                // backgroundColor: 'red',
                justifyContent: 'space-between',
                marginTop: 15,
                paddingBottom: 10
                // zIndex: 100,
              }}>
              {!this.state.keyboardActive &&
                (this.state.camera ? (
                  <View
                    style={{
                      width: '100%',
                      flex: 1,
                      // backgroundColor: 'yellow',
                    }}>
                    <View style={styles.topContainer}>
                      <TouchableOpacity
                        style={styles.cameraStyle}
                        onPress={() => this.handleCamera()}>
                        <Icon name="camera" size={25} color="black" />
                      </TouchableOpacity>
                      <View style={{width: wp('70%')}}>
                        <Text
                          style={[
                            {
                              textAlign: 'center',
                              color: 'grey',
                              marginTop: 5,
                            },
                            this.state.scanned && {color: 'green'},
                          ]}>
                          {this.state.scanned
                            ? 'Bar код амжилттай уншигдсан.'
                            : 'Та иргэний үнэмлэхний ард байрлах QR code-г уншуулна уу!'}
                        </Text>
                      </View>
                    </View>

                    <View
                      style={{
                        width: '90%',
                        paddingVertical: 10,
                        //height: SCREEN_HEIGHT * 0.6,
                        backgroundColor: 'white',
                        alignSelf: 'center',
                        borderRadius: 10,
                        justifyContent: 'center',
                        marginTop: 15,
                      }}>
                      <View style={styles.item}>
                        <Text style={styles.itemText}>УРГЫН ОВОГ</Text>
                        <TextInput
                          onChangeText={(t) => this.setState({familyName: t})}
                          // onSubmitEditing={Keyboard.dismiss}
                          style={styles.input}
                        />
                      </View>
                      <View style={styles.item}>
                        <Text style={styles.itemText}>ОВОГ</Text>
                        <TextInput
                          onChangeText={(t) => this.setState({surName: t})}
                          onSubmitEditing={Keyboard.dismiss}
                          style={styles.input}
                        />
                      </View>
                      <View style={styles.item}>
                        <Text style={styles.itemText}>НЭР</Text>
                        <TextInput
                          onChangeText={(t) => this.setState({givenName: t})}
                          onSubmitEditing={Keyboard.dismiss}
                          style={styles.input}
                        />
                      </View>
                      <View style={styles.item}>
                        <Text style={styles.itemText}>ХҮЙС</Text>
                        <Picker
                          // selectedValue={null}
                          style={{
                            height: 30,
                            width: 100,
                            //backgroundColor: 'orange',
                          }}
                          onValueChange={(itemValue, itemIndex) =>
                            this.setState({sex: itemValue})
                          }>
                          <Picker.Item label="ЭР" value="Male" />
                          <Picker.Item label="ЭМ" value="Female" />
                        </Picker>
                      </View>
                      <View style={styles.item}>
                        <Text style={styles.itemText}>ТӨРСӨН ОГНОО</Text>
                        <DatePicker
                          //style={[styles.item, {width: '92%'}]}
                          style={{width: 130}}
                          date={this.state.date}
                          mode="date"
                          placeholder="select date"
                          format="YYYY-MM-DD"
                          minDate="1900-01-01"
                          maxDate={new Date()}
                          confirmBtnText="Confirm"
                          cancelBtnText="Cancel"
                          customStyles={{
                            dateIcon: {
                              position: 'absolute',
                              left: 0,
                              top: 4,
                              marginLeft: 0,
                            },
                            dateInput: {
                              marginLeft: 35,
                              borderWidth: 0,
                              //backgroundColor: 'blue',
                            },
                          }}
                          onDateChange={(date) => {
                            this.setState({date: date});
                          }}
                        />
                      </View>
                      <View style={styles.item}>
                        <Text style={styles.itemText}>РЕГИСТРИЙН ДУГААР</Text>
                        <TextInput
                          placeholder="АА00000000"
                          onChangeText={(t) =>
                            this.setState({registrationNumber: t})
                          }
                          onSubmitEditing={Keyboard.dismiss}
                          style={styles.input}
                        />
                      </View>
                      <View style={styles.item}>
                        <Text style={styles.itemText}>УТАСНЫ ДУГААР</Text>
                        <TextInput
                          onChangeText={(t) => this.setState({phoneNumber: t})}
                          keyboardType="phone-pad"
                          onSubmitEditing={Keyboard.dismiss}
                          style={styles.input}
                        />
                      </View>
                      <View style={styles.item}>
                        <Text style={styles.itemText}>НУУЦ ҮГ</Text>
                        <TextInput
                          onChangeText={(t) => this.setState({password: t})}
                          secureTextEntry
                          onSubmitEditing={Keyboard.dismiss}
                          style={styles.input}
                        />
                      </View>
                      <View
                        style={[
                          styles.item,
                          this.state.wrongPass && {borderBottomColor: 'red'},
                        ]}>
                        <Text style={styles.itemText}>НУУЦ ҮГ ДАВТАХ</Text>
                        <TextInput
                          secureTextEntry
                          onChangeText={(t) => this.passwordChecker(t)}
                          onSubmitEditing={Keyboard.dismiss}
                          style={styles.input} //Aldaanii Style nemeh
                        />
                      </View>
                    </View>
                    <View style={styles.topContainer}>
                      <TouchableOpacity
                        style={styles.cameraStyle}
                        onPress={() => this.getAvatar()}>
                        {this.state.localUri === 'a' ? (
                          <AntiIcon name="idcard" size={25} color="black" />
                        ) : (
                          <Image
                            style={{width: 40, height: 30, borderRadius: 5}}
                            source={{uri: this.state.localUri}}
                          />
                        )}
                      </TouchableOpacity>
                      <Text
                        style={[
                          {
                            textAlign: 'center',
                            color: 'grey',
                            marginTop: 5,
                          },
                          this.state.CardFront && {color: 'green'},
                        ]}>
                        {this.state.CardFront
                          ? 'Иргэний үнэмлэхний урд талын зураг оруулсан.'
                          : 'Иргэний үнэмлэхний урд талын зургыг оруулна уу.'}
                      </Text>
                    </View>
                    <Button method={this.signUp} name="Бүртгүүлэх" />
                  </View>
                ) : (
                  <QRCodeScanner
                    showMarker
                    onRead={this.onSuccess.bind(this)}
                    cameraStyle={{
                      height: SCREEN_HEIGHT * 0.8,
                      backgroundColor: 'transparent',
                    }}
                    customMarker={
                      <View style={styles.rectangleContainer}>
                        <View style={{flexDirection: 'row'}}>
                          <View style={styles.leftAndRightOverlay} />

                          <View style={styles.rectangle}>
                            {/* <Image
                              style={{height: 220, width: 220}}
                              source={require('../../../images/qrScanner.png')}></Image> */}
                          </View>

                          <View style={styles.leftAndRightOverlay} />
                        </View>
                        <View style={styles.bottomOverlay} />
                      </View>
                    }
                  />
                ))}
            </View>
          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}
export default Signup;

const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const styles = StyleSheet.create({
  containerView: {
    backgroundColor: 'transparent',
    // backgroundColor: 'red',
    flex: 1,
    // height: SCREEN_HEIGHT,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  item: {
    borderBottomColor: '#DBD0D0',
    borderBottomWidth: 1,
    marginHorizontal: 15,
    marginVertical: 1,
  },
  itemText: {
    marginTop: 5,
    color: 'grey',
    fontSize: 12,
  },
  input: {
    padding: 0,
  },
  lastItem: {
    marginHorizontal: 15,
  },

  cameraStyle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  topContainer: {
    width: '100%',
    height: 100,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'green',
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: 'red',
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  bottomOverlay: {
    flex: 1,
    width: SCREEN_WIDTH,
    backgroundColor: '#f2f2f2',
  },

  leftAndRightOverlay: {
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
  },
});
