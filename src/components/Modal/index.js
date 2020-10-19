import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  Modal,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import Button from '../Button';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const Mood = (props) => {
  return (
    <Modal
      onRequestClose={() => props.closeModal()}
      animationType="slide"
      visible={props.show}
      transparent={true}>
      <View
        style={styles.shadow}
        onStartShouldSetResponder={() => props.closeModal()}
      />
      <View style={styles.ModalContainer}>
        {props.loading ? (
          <View style={styles.loading}>
            <Text style={{fontSize: 20, color: '#9D9D9D'}}>
              Ачаалалж байна...
            </Text>
            <ActivityIndicator
              size="large"
              color="#9D9D9D"
              style={{marginTop: 50}}
            />
          </View>
        ) : (
          props.children
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  shadow: {
    //flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    position: 'absolute',
    top: 0,
    left: 0,
    width: windowWidth,
    height: windowHeight,
  },
  ModalContainer: {
    opacity: 1,
    width: '90%',
    height: windowHeight * 0.45,
    backgroundColor: 'white',
    alignSelf: 'center',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'column',
    padding: 50,
    paddingTop: 50,
    marginTop: windowHeight * 0.2,
  },
  ModalTitle: {
    fontSize: 16,
    color: '#707070',
  },
  ModalTailbar: {
    color: '#BFBFBF',
    fontSize: 12,
  },
  loading: {
    marginTop: 80,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Mood;
