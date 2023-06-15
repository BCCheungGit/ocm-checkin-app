import React, { useState, useRef} from 'react';
import { View, Text, Pressable} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage"
import LoginScreen from './Login';



function Welcome( {route, navigation} ) {
  /*
    navigation.reset({
      index: 0,
      routes: [{name: 'Welcome'}]
    })
*/
    const [currentNumber, setCurrentNumber] = useState("");


    const getData = async () => {
      try {
        const value = await AsyncStorage.getItem('phone_number_key');
        if (value !== null) {
          setCurrentNumber(value);
        }
      } catch(error) {
        console.log(error)
      }
    }

    const removeData = async () => {
      try {
        await AsyncStorage.removeItem('phone_number_key');
        //navigation.navigate(LoginScreen);
        let value = await AsyncStorage.getItem('phone_number_key')
        console.log(value)
      } catch(error) {
        console.log(error)
      }
      
    }




    getData();

    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>You are currently logged in as {currentNumber}</Text>
        <Text>Insert QR Code Here</Text>
        <Pressable onPress={removeData}>
          <Text>Log Out</Text>
        </Pressable>
      </View>
    )
  }

export default Welcome;