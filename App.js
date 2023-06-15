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



function App() {
  
  const [signedIn, setSignedIn] = useState(null)

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('phone_number_key');
      setSignedIn(value)
      console.log(value)
      console.log(signedIn)
    } catch(error) {
      console.log(error)
    }
  }

  React.useEffect(()=> {
    getData();
  }, [])  
 

  return (
    <NavigationContainer>
    <Stack.Navigator>
      {signedIn !== null ? (
        <>
      <Stack.Screen name="Welcome" component={Welcome} />
      </>
    ) : (
      <>
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </>
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