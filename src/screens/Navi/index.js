import React from 'react';
import Profile from '../Profile';
import SalbarNemeh from '../SalbarNemeh';
import Salbar from '../Salbar';
import {createStackNavigator} from '@react-navigation/stack';
//----------------------------------------------------Hereglehee boliv
const Stack = createStackNavigator();

const Navi = () => {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={Profile}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="SalbarNemeh"
        component={SalbarNemeh}
        options={{
          title: 'Салбар нэмэх',
          headerTitleAlign: 'center',
        }}
      />
      <Stack.Screen
        name="Salbar"
        component={Salbar}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Navi;
