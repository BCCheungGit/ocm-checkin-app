import React, { useState, useEffect} from 'react';
import { View, Text, Pressable, StyleSheet, Dimensions, Image} from 'react-native';

import AsyncStorage from "@react-native-async-storage/async-storage"

import { useLang, useLoggedIn, useId, useName } from '../states/global';

import generateQRCode from './generateQR';



import Svg, { Path } from 'react-native-svg';


function Welcome() {
    const { width } = Dimensions.get('window');
    const isSmallScreen = width < 375;
    //initialize state variables. useLoggedIn() is the global state variable used for authentication checking.
    const [auth, setAuth] = useLoggedIn();
    const [currentNumber, setCurrentNumber] = useState("");
    const [currentUser, setCurrentUser] = useState("");
    const [currentId, setCurrentId] = useState("");
    const [currentHid, setCurrentHid] = useState("");
    const [currentNickname, setCurrentNickname] = useState("");
    const [currentMembership, setCurrentMembership] = useState("");
    const emptyNickname = "";
    //const [fname, setfname] = useName();
    //const [peopleId, setPeopleId] = useId();
    const [isChinese, setIsChinese] = useLang();



    //getData Asynchrinous function: checks local AsyncStorage to see if a number with the key exists.
    //if it does, set current user to the phone number.
    /*
      TODO: When database connection is established, instead display name of the person logged in instead of their phone #
     */


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

    useEffect(() => {
      const checkAuthentication = async () => {
        try {
          
          const numberValue = await AsyncStorage.getItem('phone_number_key');
          const fnameValue = await AsyncStorage.getItem('first_name_key');
          const lnameValue = await AsyncStorage.getItem('last_name_key');
          const pidValue = await AsyncStorage.getItem('p_id_key');
          const hidValue = await AsyncStorage.getItem('h_id_key');
          const nicknameValue = await AsyncStorage.getItem('nickname_key');
          const membershipValue = await AsyncStorage.getItem('membership_key');

          

          setCurrentUser(fnameValue + " " + lnameValue);
          setCurrentId(pidValue);
          setCurrentHid(hidValue);
          setCurrentNumber(numberValue);
          setCurrentMembership(membershipValue);
          setCurrentNickname(nicknameValue);

        } catch (error) {
          console.log(error);
        }
      };
  
      checkAuthentication();
    }, []);


  

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
          justifyContent: 'center',
          alignContent: 'center',
          position: 'relative',
          backgroundColor: 'white',
      },
      label: {
          fontSize: 15,
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
          fontSize: isSmallScreen ? 25 : 30,
          padding: 10,
          position: 'absolute',
          top: isSmallScreen ? '25%' : '30%', 
          alignSelf: 'center',

      },
      button: {

        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#5b2878',
        padding: 10,
        position: 'absolute',
        alignSelf: 'flex-end', 
        marginRight: 16,
      },
      svgCurve: {
        position: 'absolute',
        width: Dimensions.get('window').width
      },
      bottom: {
        position: 'absolute',
        width: Dimensions.get('screen').width,
        bottom: 0,
        zIndex: -1,
      },
      box: {
        backgroundColor: '#5b2878',
        height: 200,
        zIndex: -1,
      },
      bottomWavy: {
        position: 'absolute',
        bottom: 100,
        zIndex: -1,
      },
      image: {
        resizeMode: 'contain',
        height: 100,
        width: 100,
        position: 'absolute',
        top: 20,
        left: "5%",

      },
      membership: {
        fontSize: 16,
        padding: 10,
        fontWeight: 'bold',
        position: 'absolute',
        top: isSmallScreen ? '31%' : '36%', 
        alignSelf: 'center',
        color: "#A254CE" 
      },
      ocm: {
        fontSize: isSmallScreen ? 24 : 35,
        padding: 10,
        fontWeight: 'bold',
        position: 'absolute',
        top: "10%",
        left: "30%",
        color: '#8037A9'
      },
      nickname: {
        fontSize: 25,
        padding: 10,
        position: 'absolute',
        left: "10%",
        alignItems: 'center',
        fontWeight: 'bold',
      },
  })

    //return welcome screen
    /*
      TODO: Add QR codes from database.
    */
    return (
      <View style={[styles.container]}>
        


        <Image source={require('../images/ocmlogo.png')} style={styles.image} />
        <Text style={[styles.ocm]}> 中 宣 會 OCM</Text>
        <Text style={[styles.title]}>{currentUser}</Text>
        <Text style={[styles.membership]}>{currentMembership}</Text>
        <Text style={[styles.nickname]}>{currentNickname == null ? currentNickname : emptyNickname}</Text>
        {generateQRCode(currentHid, currentId)}
        
        <Pressable onPress={logOut} style={styles.button}>
          {isChinese ? (
            <Text style={[styles.label]}>登出</Text>
          ) : (
            <Text style={[styles.label]}>Log Out</Text>
          )}

        </Pressable>
        <View style={styles.bottom}>
        <View style={styles.box}>
          <Svg
            height={250}
            width={Dimensions.get('screen').width}
            viewBox="0 0 1440 320"
            style={styles.bottomWavy}
          >
            <Path
              fill="#5b2878"
              d='M0,64L40,96C80,128,160,192,240,202.7C320,213,400,171,480,149.3C560,128,640,128,720,154.7C800,181,880,235,960,218.7C1040,203,1120,117,1200,74.7C1280,32,1360,32,1400,32L1440,32L1440,320L1400,320C1360,320,1280,320,1200,320C1120,320,1040,320,960,320C880,320,800,320,720,320C640,320,560,320,480,320C400,320,320,320,240,320C160,320,80,320,40,320L0,320Z'
            />
          </Svg>
        </View>
      </View>
      </View>
    )
  }


//export function.
export default Welcome;