import React, {useState, useRef, useEffect} from 'react';
import { View, Text, TextInput, Keyboard, StyleSheet, Image} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { firebaseConfig } from '../config/config'
import firebase from 'firebase/compat/app'
import { Pressable } from 'react-native';



import { login, logout } from '../redux/authSlice';
import Axios from 'axios';

import { useLang, useLoggedIn, useName, useId } from '../states/global';

import AsyncStorage from '@react-native-async-storage/async-storage';

import TranslateButton from '../globalComponents/translateButton';

//LoginScreen: the main function for the login screen (pretty self-explanatory)

function LoginScreen() {



    //create state variables
    const [ number, setNumber ] = useState("");
    let fbNumber = "";

    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    
    const [verificationCompleted, setVerificationCompleted] = useState(false)
    


    const recaptchaVerifier = useRef(null);
    const [ showInvalid, setShowInvalid ] = useState(false);
    const phoneInput = useRef();

    
   

    const [auth, setAuth] = useLoggedIn();
    const [sentCode, setSentCode] = useState(false);
    const codeInput = useRef();

    const [isChinese, setIsChinese] = useLang();


    const [fname, setfname] = useName();
    const [peopleId, setPeopleId] = useId();
    const toggleSwitch = () => {
      setIsChinese(previousState => !previousState)

    }


    //storeData asynchrinous function to create a key for the phone number entered.
    //Saves this key value pair to local storage for future reference.
    /* 
      NOTE: SecureStorage is an alternative, but I don't think it is necessary to encrypt the phone number
      since it will usually be the same as the phone being used. This is a phone auth app, so there is no password
      involved. Therefore, I will most likely continue to use AsyncStorage since I've used it before.
    */
    const storeData = async (key, value) => {
      try {
        await AsyncStorage.setItem(key, value)
        console.log(`${value} stored successfully!`)
      } catch (error) {
        console.log(error)
      }
    }


    //sendVerification: uses firebase to send a verification code to the phone number provided.
    const sendVerification = () => {
      if (number.substring(0, 1) == "1") {
        fbNumber = "+" + number;
      } else {
        fbNumber = "+1" + number;
      }

      Axios.get('http://192.168.86.195:3000/login', {
        params: {
          phone_number: number,
        },
    }).then((response) => {
        if (!response.data.message) {
          console.log(response.data[0]);
          const data = response.data[0];
          const { fname, lname, people_id, household_id, profilePicture } = data;

          phoneInput.text = '';
          storeData('first_name_key', fname);
          storeData('p_id_key', people_id);
          storeData('h_id_key', household_id);
          /* STORE FNAME, LNAME, PEOPLEID IN SECURESTORAGE/ASYNCSTORAGE */
          
          
          const phoneProvider = new firebase.auth.PhoneAuthProvider();
          phoneProvider
              .verifyPhoneNumber(fbNumber, recaptchaVerifier.current)
              .then((verificationId) => {
                setVerificationId(verificationId);
                setVerificationCompleted(true);
                setSentCode(true);
              })
              .catch((error) => {
                console.log(error);
                setVerificationCompleted(false);
              })
          setCode('');
          
        } else {
          setSentCode(false);
          phoneInput.text = '';
          setShowInvalid(true);
          console.log("doesnt exist")
          setVerificationId(null);
          setVerificationCompleted(false);
        }
      }).catch(
        error => console.log(error.response.data)
        )




            
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

            

          
            setSentCode(false);
            storeData('phone_number_key', number);
            setAuth(true);
            //dispatch(login());

          
            
            setCode('');
            setNumber('');
            
        })
        .catch((error) => {

            console.log(error);

        })
        
    }

    /*
    useEffect(() => {
      console.log("Redux store state:", state); // Log the entire Redux store state
      console.log("useEffect am logged in: " + isAuthenticated); 
    }, [isAuthenticated]);
*/



    //style sheet creation
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            position: 'relative',
            alignItems: 'center', 
            justifyContent: 'center',
            height: '100%',
            width: '100%',
            backgroundColor: 'white',
        },
        textinput: {

            height: 55,
            margin: 12,
            borderWidth: 1,
            padding: 10,
            width: "90%" 
        },
        button: {

            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 12,
            borderRadius: 4,
            elevation: 3,
            width: '40%',
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
          height: 100,
          width: 100,
          marginBottom: 30,

        },
    })


    //The main return of the LoginScreen function. Returns a basic login page that allows users to enter their information
    //and sign in.
    return (

      <View style={[styles.container]} onScroll={() => Keyboard.dismiss()} onPress={Keyboard.dismiss} acessible={false}>

      
          <TranslateButton 
                value={isChinese}
                onValueChange={toggleSwitch}
          />
          <Image source={require('../images/ocmlogo.png')} style={styles.image} />

          {verificationCompleted == false ? (
            <>
              {isChinese ? (
                <Text style={styles.title}>欢饮来到中宣会</Text>
              ) : (
                <Text style={[styles.title]}>
                Welcome to OCM!
                </Text>
              )}
            {isChinese ? (
                <TextInput 
                ref={phoneInput}
                defaultValue=""
                placeholder='加入手机号码'
                onChangeText={(text) => {
                    setNumber(text);
                }}
                keyboardType='number-pad'
                style={[styles.textinput]}
              />
            ) : (
          <TextInput 
            ref={phoneInput}
            defaultValue=""
            placeholder='Enter Phone Number'
            onChangeText={(text) => {
                setNumber(text);
                setShowInvalid(false);
               
                
            }}
            keyboardType='number-pad'
            style={[styles.textinput]}
          />
            )}
            
          <Pressable style={[styles.button]} onPress={
            () => {
                console.log("Phone Number:" + number);
                sendVerification();
                //setSentCode(true);
                phoneInput.text = '';
            }}>
            {isChinese ? (
              <Text style={styles.label}>发验正码</Text>
            ) : (
              <Text style={styles.label}>Send Code</Text>
            )}

          </Pressable>
          <FirebaseRecaptchaVerifierModal 
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
          {showInvalid && <Text style={[styles.text]}>Phone number is not valid!</Text>}
          </>
          ) : (
            
          
          <>
            {isChinese ? (
              <Text style={styles.title}>加入验证码</Text>
            ) : (
              <Text style={[styles.title]}>
              Enter Verification Code
              </Text>
            )}

          {isChinese ? (
            <TextInput 
            ref={codeInput}
            value={code}
            placeholder="加入验证码"
            onChangeText={setCode}
            keyboardType='number-pad'
            style={[styles.textinput]}
          />
          ):(
            <TextInput 
            ref={codeInput}
            value={code}
            placeholder='Enter Verification Code'
            onChangeText={setCode}
            keyboardType='number-pad'
            style={[styles.textinput]}
          />
          )}
            
          <Pressable style={[styles.button]}
         onPress={confirmCode}>
          {isChinese ? (
            <Text style={styles.label}>证实</Text>
          ):(
            <Text style={styles.label}>Confirm</Text>
          )}
            
          </Pressable>
          
          </>
          )}

          

        

        </View>



    );





}

//export function
export default LoginScreen;