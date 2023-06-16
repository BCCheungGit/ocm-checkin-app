import React, {useState, useRef,} from 'react';
import { View, Text, TextInput, Keyboard, StyleSheet, Image} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { firebaseConfig } from '../config/config'
import firebase from 'firebase/compat/app'
import { Pressable } from 'react-native';

import { KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {useLoggedIn } from '../states/global';

import Axios from 'axios';

import AsyncStorage from '@react-native-async-storage/async-storage';



//LoginScreen: the main function for the login screen (pretty self-explanatory)

function LoginScreen() {

    //create state variables
    const [ number, setNumber ] = useState("");
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const [ showInvalid, setShowInvalid ] = useState(false);
    const phoneInput = useRef();
    const [ showSuccess, setShowSuccess ] = useState(false);
    const [auth, setAuth] = useLoggedIn();
    const [sentCode, setSentCode] = useState(false);
    const codeInput = useRef();


    //storeData asynchrinous function to create a key for the phone number entered.
    //Saves this key value pair to local storage for future reference.
    /* 
      NOTE: SecureStorage is an alternative, but I don't think it is necessary to encrypt the phone number
      since it will usually be the same as the phone being used. This is a phone auth app, so there is no password
      involved. Therefore, I will most likely continue to use AsyncStorage since I've used it before.
    */
    const storeData = async (value) => {
      try {
        await AsyncStorage.setItem('phone_number_key', value)
        console.log(`${value} stored successfully!`)
      } catch (error) {
        console.log(error)
      }
    }


    //sendVerification: uses firebase to send a verification code to the phone number provided.
    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(number, recaptchaVerifier.current)
            .then(setVerificationId);
            
    };


    //confirmCode: this function handles submit of code. Signs in the user using firebase and the entered number, 
    //then sets auth to true and resets data. This will result in redirect to the Welcome.js route.
    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase.auth().signInWithCredential(credential)
        .then(() => {

          /*  
            Axios.post('www.cloudority.com/login', {
              phone_number: number,
            }).then((response) => {

            })
              */
            setSentCode(false);
            storeData(number);
            setAuth(true);

            
            setCode('');
            setNumber('');
            
        })
        .catch((error) => {

            console.log(error);

        })
        
    }

    //style sheet creation
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            alignItems: 'center', 
            justifyContent: 'center' 
        },
        textinput: {
            height: 55,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: 300 
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
        image: {
          resizeMode: 'contain',
          height: 150,
          width: 160,
          marginBottom: 30,

        },
    })


    //The main return of the LoginScreen function. Returns a basic login page that allows users to enter their information
    //and sign in.
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} acessible={false}>
        <KeyboardAwareScrollView style={{backgroundColor: "white"}}
          resetScrollToCoords={{x: 0, y: 0}}
          contentContainerStyle={styles.container}
          scrollEnabled={true}
        >
          <FirebaseRecaptchaVerifierModal 
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
          <Image source={require('../images/ocmlogo.png')} style={styles.image} />

          {sentCode == false ? (
            <View style={[{justifyContent: 'center'}, {alignItems:'center'}]}>
            <Text style={[styles.title]}>
            OCM QR Code Viewer
            </Text>
            <TextInput 
            ref={phoneInput}
            defaultValue=""
            placeholder='Enter Phone Number'
            onChangeText={(text) => {
                setNumber("+1" + text);
                setShowInvalid(false);
                setShowSuccess(false);
            }}
            keyboardType='number-pad'
            style={[styles.textinput]}
          />
          <Pressable style={[styles.button, {marginBottom: 100}]} onPress={
            () => {
                console.log("Phone Number:" + number);
                sendVerification();
                setSentCode(true);
                setShowSuccess(true);
                phoneInput.text = '';
            }}>
            <Text style={styles.label}>Send Code</Text>
          </Pressable>
        
          {showSuccess && (
            <View>
                <Text style={[styles.text]} >Code Sent!</Text>
            </View>
          )}
          {showInvalid && (
            <View>
              <Text style={[styles.text]} >Phone number is not valid!</Text>
            </View>
          )}

          </View>


          ) : (
            
          
          <View style={[{justifyContent: 'center'}, {alignItems:'center'}]}>
            <Text style={[styles.title]}>
            Enter Verification Code
            </Text>
            <TextInput 
            ref={codeInput}
            value={code}
            placeholder='Enter Verification Code'
            onChangeText={setCode}
            keyboardType='number-pad'
            style={[styles.textinput]}
          />
          <Pressable style={({ pressed }) => [
        {backgroundColor: pressed ? { opacity: 0.8} : {}},
        styles.button
        ]} onPress={confirmCode}>
            <Text style={styles.label}>Confirm</Text>
          </Pressable>
          </View>
          )}

          


        </KeyboardAwareScrollView>
      </TouchableWithoutFeedback>
    );





}

//export function
export default LoginScreen;