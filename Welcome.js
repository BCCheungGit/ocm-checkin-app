import React, { useState, useRef} from 'react';
import { View, Text, Pressable} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage"
import LoginScreen from './Login';

import { isLoggedIn } from './states/global';

function Welcome( {navigation} ) {
  /*
    navigation.reset({
      index: 0,
      routes: [{name: 'Welcome'}]
    })
*/


    const [auth, setAuth] = isLoggedIn();
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

    const logOut = () => {
      removeData();
      setAuth(false);
      //navigation.navigate(LoginScreen)
    }


    const styles = StyleSheet.create({
      container: {
          flex: 1,
          padding: 20,
          flex: 1, 
          alignItems: 'center', 
          justifyContent: 'center' 
      },
      label: {
          fontSize: 16,
          lineHeight: 21,
          fontWeight: 'bold',
          letterSpacing: 0.25,
          color: 'white',
        },
      text: {
          padding: 10,
          fontSize: 15,
      },
      title: {
          fontWeight: 'bold',
          fontSize: 25,

      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'purple',
      },
  })

    return (
      <View style={[styles.container]}>
        <Text style={[styles.title]}>You are currently logged in as {currentNumber}</Text>
        <Text>Insert QR Code Here</Text>
        <Pressable onPress={logOut} style={styles.button}>
          <Text style={[styles.label]}>Log Out</Text>
        </Pressable>
      </View>
    )
  }

export default Welcome;