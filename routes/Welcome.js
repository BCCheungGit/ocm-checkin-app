import React, { useState} from 'react';
import { View, Text, Pressable, StyleSheet} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage"

import { useLang, useLoggedIn, useId, useName } from '../states/global';

import generateQRCode from './generateQR';

import TranslateButton from '../globalComponents/translateButton';

function Welcome() {

    //initialize state variables. useLoggedIn() is the global state variable used for authentication checking.
    const [auth, setAuth] = useLoggedIn();
    const [currentNumber, setCurrentNumber] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [currentId, setCurrentId] = useState("");
    const [currentHid, setCurrentHid] = useState("");
    //const [fname, setfname] = useName();
    //const [peopleId, setPeopleId] = useId();
    const [isChinese, setIsChinese] = useLang();

    const toggleSwitch = () => {
      setIsChinese(previousState => !previousState)
    }

    //getData Asynchrinous function: checks local AsyncStorage to see if a number with the key exists.
    //if it does, set current user to the phone number.
    /*
      TODO: When database connection is established, instead display name of the person logged in instead of their phone #
     */
    const getData = async (key) => {
      try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
          return value;
        }
      } catch(error) {
        console.log(error)
      }
    }

    //removeData Asynchrinous function: remove the data from local storage if the user chooses to 
    //log out.
    const removeData = async (key) => {
      try {
        await AsyncStorage.removeItem(key);
        //navigation.navigate(LoginScreen);
        let value = await AsyncStorage.getItem(key)
        console.log(value)
      } catch(error) {
        console.log(error)
      }
      
    }

    getData('phone_number_key').then(value => {
      setCurrentNumber(value);
      console.log(value);
    }).catch(error => {
      console.log(error);
    })

    getData('first_name_key').then(value => {
      setCurrentUser(value);
      console.log(value);
    }).catch(error => {
      console.log(error);
    })

    getData('p_id_key').then(value => {
      setCurrentId(value);
      console.log(value);
    }).catch(error => {
      console.log(error);
    })

    getData('h_id_key').then(value => {
      setCurrentHid(value);
      console.log(value);
    }).catch(error => {
      console.log(error);
    })

    //remove data and unauthenticate on log out.
    const logOut = () => {
      removeData('phone_number_key');
      removeData('first_name_key');
      removeData('p_id_key');
      removeData('h_id_key');
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
        marginTop: 20,
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
            <Text style={[styles.title]}>名字: {currentUser}</Text>
            <Text style={[styles.title]}>手机号: {currentNumber}</Text>
            {generateQRCode(currentHid, currentId)}
          </>
        ) : (
          <>
            <Text style={[styles.title]}>You are currently logged in as:</Text>
            <Text style={[styles.title]}>Name: {currentUser}</Text>
            <Text style={[styles.title]}>Phone Number: {currentNumber}</Text>
            {generateQRCode(currentHid, currentId)}
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