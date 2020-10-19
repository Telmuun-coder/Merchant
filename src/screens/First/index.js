import React, {useContext} from 'react';
import {StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {AuthContext} from '../../Context/AuthContext';
import {UserState} from '../../Context/UserState';

const First = (props) => {
  const {Voting} = useContext(AuthContext);
  const userState = useContext(UserState);
  return (
    <View style={styles.container}>
      <Text>Hi, to choose yourself</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Voting('org');
          userState.voter('org');
        }}>
        <Text style={styles.name}>Албан байгууллага</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          Voting('per');
          userState.voter('per');
        }}>
        <Text style={styles.name}>Хувь хүн</Text>
      </TouchableOpacity>
    </View>
  );
};

export default First;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: 'orange',
    marginTop: 30,
    width: '80%',
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
  },
  name: {
    color: 'white',
    fontSize: 18,
  },
});
