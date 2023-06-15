import React, { useState, useRef} from 'react';
import { View, Text, Button, TextInput, Keyboard} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhoneInput from 'react-native-phone-number-input';
import { TouchableWithoutFeedback } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'

import LoginScreen from './routes/Login';
import Welcome from './routes/Welcome';

import {useLoggedIn } from './states/global';

const Stack = createNativeStackNavigator();



function App() {
  const [auth, setAuth] = useLoggedIn();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('phone_number_key');
      if (value !== null) {
        setAuth(true);
        console.log("successfully authenticated!")
      }
    } catch(error) {
        console.log(error);
    }
  }
  getData();

  return (
    <NavigationContainer>
    <Stack.Navigator>
    {auth ? 
    (<Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
    ) : (
    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>)}  
      
      </Stack.Navigator>
    </NavigationContainer>

    
  );
}

export default App;