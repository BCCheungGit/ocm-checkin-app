import {React, useState, useRef} from 'react';
import { View, Text, Button, TextInput, Keyboard} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import { TouchableWithoutFeedback } from 'react-native';
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'
import { firebaseConfig } from './config'
import firebase from 'firebase/compat/app'
import Welcome from './Welcome';




function LoginScreen({ navigation }) {
    const [ number, setNumber ] = useState("");
    const [code, setCode] = useState('');
    const [verificationId, setVerificationId] = useState(null);
    const recaptchaVerifier = useRef(null);
    const [ valid, setValid ] = useState(false);
    const [ showInvalid, setShowInvalid ] = useState(false);
    const phoneInput = useRef();
    const [ showSuccess, setShowSuccess ] = useState(false);


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
        })
        .catch((error) => {
            //show an alert
            console.log(error);
        })
        navigation.navigate(Welcome)
    }



    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} acessible={false}>
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <FirebaseRecaptchaVerifierModal 
            ref={recaptchaVerifier}
            firebaseConfig={firebaseConfig}
          />
          <Text>
            Login Page
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
          />
          <Button 
            title="Send Code"
            onPress={() => {
              console.log("Phone Number:" + number);
              sendVerification();
              setShowSuccess(true);
              
              /* if (valid === true) {
                
                
              } else {
                navigation.navigate(LoginScreen)
                setShowInvalid(true);
              }
              */
            }
            }
          />
          {showSuccess && (
            <View>
                <Text>Code Sent!</Text>
            </View>
          )}
          {showInvalid && (
            <View>
              <Text>Phone number is not valid!</Text>
            </View>
          )}
          <TextInput 
            placeholder='confirm code'
            onChangeText={setCode}
            keyboardType='number-pad'
          />
          <Button 
            title="Confirm"
            onPress={confirmCode}
          />
        </View>
      </TouchableWithoutFeedback>
    );
  }
  
  export default LoginScreen;