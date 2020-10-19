import React, {Component, useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
const Button = (props) => {
  return (
    <View style={styles.BtnContainer}>
      <TouchableOpacity onPress={() => props.method()}>
        <LinearGradient
          colors={['#F1CA2E', '#F6972A']}
          style={styles.LinearGradientStyle}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0, 1]}>
          <Text style={styles.buttonText}>{props.name}</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
};
export default Button;
const styles = StyleSheet.create({
  BtnContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  LinearGradientStyle: {
    width: wp('80%'),
    // marginVertical: 15,
    elevation: 3,
    height: hp('7%'),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 14,
    color: '#fff',
  },
});
