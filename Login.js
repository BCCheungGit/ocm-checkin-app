import {React, useState, useRef} from 'react';
import { View, Text, Button, TextInput, Keyboard, StyleSheet} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { TouchableWithoutFeedback } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { firebaseConfig } from './config'
import firebase from 'firebase/compat/app'
import Welcome from './Welcome';
import { Pressable } from 'react-native';




function LoginScreen({ navigation }) {
    const [ number, setNumber ] = useState("");
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const [ valid, setValid ] = useState(false);
    const [ showInvalid, setShowInvalid ] = useState(false);
    const phoneInput = useRef();
    const [ showSuccess, setShowSuccess ] = useState(false);
    const [ selected, setSelected ] = useState(false);

    const sendVerification = () => {
        const phoneProvider = new firebase.auth.PhoneAuthProvider();
        phoneProvider
            .verifyPhoneNumber(number, recaptchaVerifier.current)
            .then(setVerificationId);
            setNumber('');
    };

    const confirmCode = () => {
        const credential = firebase.auth.PhoneAuthProvider.credential(
            verificationId,
            code
        );
        firebase.auth().signInWithCredential(credential)
        .then(() => {
            setCode('');
            navigation.navigate(Welcome)
        })
        .catch((error) => {
            //show an alert
            console.log(error);

        })
        
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            flex: 1, 
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

        }
    })


    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} acessible={false}>
        <View style={[
            styles.container
        ]}>
          <FirebaseRecaptchaVerifierModal 
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
          <Text style={[styles.title]}>
            OCM QR Code Viewer
            </Text>
            <TextInput 
            ref={phoneInput}
            defaultValue=""
            placeholder='Enter Phone Number'
            onChangeText={(text) => {
                setNumber("+1" + text);
                setValid(true);
                setShowInvalid(false);
                setShowSuccess(false);
            }}
            keyboardType='number-pad'
            style={[styles.textinput]}
          />
          <Pressable style={[({ pressed }) => [
      {
        backgroundColor: pressed
          ? 'purple'
          : 'rgb(64, 10, 100)'
      },
      styles.otherStyles
    ], styles.button, {marginBottom: 100}]} onPress={
            () => {

                console.log("Phone Number:" + number);
                sendVerification();
                setShowSuccess(true);
            /* if (valid === true) {
                
                
              } else {
                navigation.navigate(LoginScreen)
                setShowInvalid(true);
              }
              */
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
          <TextInput 
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
      </TouchableWithoutFeedback>
    );





}
  
  export default LoginScreen;