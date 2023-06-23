import React, { useState} from 'react';
import { View, Text, Pressable, StyleSheet} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage"

import { useLang } from '../states/global';
import {useLoggedIn } from '../states/global';

import TranslateButton from '../globalComponents/translateButton';

function Welcome() {

    //initialize state variables. useLoggedIn() is the global state variable used for authentication checking.
    const [auth, setAuth] = useLoggedIn();
    const [currentNumber, setCurrentNumber] = useState("");

    const [isChinese, setIsChinese] = useLang();

    const toggleSwitch = () => {
      setIsChinese(previousState => !previousState)
    }

    //getData Asynchrinous function: checks local AsyncStorage to see if a number with the key exists.
    //if it does, set current user to the phone number.
    /*
      TODO: When database connection is established, instead display name of the person logged in instead of their phone #
     */
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

    //removeData Asynchrinous function: remove the data from local storage if the user chooses to 
    //log out.
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

    //remove data and unauthenticate on log out.
    const logOut = () => {
      removeData();
      setAuth(false);
    }

    //initialize stylesheet
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
          fontSize: 18,
          padding: 10,

      },
      button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'purple',
        padding: 10,
      },
  })

    //return welcome screen
    /*
      TODO: Add QR codes from database.
    */
    return (
      <View style={[styles.container]}>
        <TranslateButton 
                value={isChinese}
                onValueChange={toggleSwitch}
          />
        {isChinese ? (
          <>
            <Text style={[styles.title]}>您当前登录身份为：</Text>
            <Text style={[styles.title]}> {currentNumber}</Text>
            <Text style={[styles.title]}>在此插入二维码</Text>
          </>
        ) : (
          <>
            <Text style={[styles.title]}>You are currently logged in as:</Text>
            <Text style={[styles.title]}> {currentNumber}</Text>
            <Text style={[styles.title]}>Insert QR Code Here</Text>
          </>
        )}

        <Pressable onPress={logOut} style={styles.button}>
          {isChinese ? (
            <Text style={[styles.label]}>登出</Text>
          ) : (
            <Text style={[styles.label]}>Log Out</Text>
          )}

        </Pressable>
      </View>
    )
  }


//export function.
export default Welcome;