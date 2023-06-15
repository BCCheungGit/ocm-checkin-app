import React, { useState, useRef} from 'react';
import { View, Text, Button, TextInput, Keyboard} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PhoneInput from 'react-native-phone-number-input';
import { TouchableWithoutFeedback } from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage'

import LoginScreen from './Login';
import Welcome from './Welcome';


const Stack = createNativeStackNavigator();

let dataExists = false;

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('phone_number_key');
    if (value == null) {
      dataExists = false;
    } else {
      dataExists = true;
    }
  } catch(error) {
    console.log(error);
  }
}


getData();

const getSignedIn = () => {

  if (dataExists == true) {
    return true;
  } else {
    return false;
  }
}



function App() {
  /*
  const [signedIn, setSignedIn] = useState(false)

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('phone_number_key');
      if (value != null) {
        setSignedIn(true)
      }
      console.log(value)
      console.log(signedIn)
    } catch(error) {
      console.log(error)
    }
  }

  getData();
*/
  const isSignedIn = getSignedIn();



  return (
    <NavigationContainer>
    <Stack.Navigator>
      {isSignedIn ? (
      <Stack.Screen name="Welcome" component={Welcome} />
    ) : (
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    )
}
       {/* 
      <Stack.Navigator initialRouteName = {route}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{title: "Login"}}/>
        <Stack.Screen name="Welcome" component={Welcome} />
      </Stack.Navigator>
      */}
      </Stack.Navigator>
    </NavigationContainer>
    
  );
}

export default App;