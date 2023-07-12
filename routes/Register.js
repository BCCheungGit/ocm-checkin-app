import React, {useState, useRef, useEffect,} from 'react';

import {Switch, Pressable, TouchableWithoutFeedback, View, Text, TextInput, Keyboard, StyleSheet, Image} from 'react-native';

import {useLoggedIn} from '../states/global';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';

import * as ImagePicker from 'expo-image-picker';
import { SafeAreaView } from 'react-native-safe-area-context';

import TranslateButton from '../globalComponents/translateButton';
import { useLang } from '../states/global';

import RegisterSuccess from './RegisterSuccess';
import Axios from 'axios';


function RegisterScreen({navigation}) {
    const [number, setNumber] = useState("");
    const [fname, setfname] = useState("");
    const [lname, setlname] = useState("");
    const [email, setEmail] = useState("");



    const [isChinese, setIsChinese] = useLang();





    const phoneInput = useRef();
    const fnameInput = useRef();
    const lnameInput = useRef();
    const emailInput = useRef();


    const [auth, setAuth] = useLoggedIn();

    const [image, setImage] = useState(null);

    const toggleSwitch = () => {
        setIsChinese(previousState => !previousState)
        if (isChinese == false) {
            navigation.navigate('UnauthorizedRoutes', { screen: "注册"})
            //changeToChinese();
        } else {
            navigation.navigate('UnauthorizedRoutes', { screen: "Register"})
            //changeToEnglish();
        }
    }
/*
    const handleLang = () => {
        if (isChinese == false) {
            changeToChinese();
        } else {
            changeToEnglish();
        }
    }

    useEffect(() => {
        handleLang();
    }, [isChinese])
*/
    const storeData = async (key, value) => {
        try {
            await AsyncStorage.setItem(key, value);
            console.log(`${value} stored successfully!`)
        } catch (error) {
            console.log(error);
        }
    }

    
    const handleRegistration = () => {
        Axios.post('http://192.168.86.195:3000/register', {
            fname: fname,
            lname: lname,
            phone_number: number,
            email: email,
            profile_picture: image,
        }).then((response) => {
            if (response.data.message) {
                console.log("Successfully registered");
            }
        }).catch((error) => {
            console.log("An error occurred:", error);
        });

    }
    const pickImage = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    }

    pickCamera = async () => {
        const {status} = await ImagePicker.requestCameraPermissionsAsync();

        if (status !== 'granted') {
            console.log('permission denied');
        }

        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);

        if (!result.canceled) {
            setImage(result.assets[0].uri)
        }
    }

/*   
    const changeToChinese = () => {
        if (lnameInput.current) {
            lnameInput.current.setNativeProps({
                placeholder: '加入姓氏'
            })
        }


        if (fnameInput.current) {
            fnameInput.current.setNativeProps({
                placeholder: '加入名字'
            })
        }

        if (phoneInput.current) {
            phoneInput.current.setNativeProps({
                placeholder: "加入手机号码"
            })
        }

        if (emailInput.current) {
            emailInput.current.setNativeProps({
                placeholder: "加入邮件"
            })
        }


    }

    const changeToEnglish = () => {
        if (lnameInput.current) {
            lnameInput.current.setNativeProps({
                placeholder: 'Enter Last Name'
            })
        }


        if (fnameInput.current) {
            fnameInput.current.setNativeProps({
                placeholder: 'Enter First Name'
            })
        }

        if (phoneInput.current) {
            phoneInput.current.setNativeProps({
                placeholder: "Enter Phone Number"
            })
        }

        if (emailInput.current) {
            emailInput.current.setNativeProps({
                placeholder: "Enter Email"
            })
        }
    }

*/
     //style sheet creation
     const styles = StyleSheet.create({
        container: {
            flex: 1,
            padding: 20,
            alignItems: 'center', 
            justifyContent: 'center', 
            marginTop: 10,
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
            marginBottom: 10,
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
        uploadButtons: {
            marginTop: 5,
            paddingVertical: 12,
            paddingHorizontal: 32,
            borderRadius: 4,
            elevation: 3,
            backgroundColor: 'purple',
        },
        switch: {
            justifyContent: 'center',
            alignContent: 'center',
            position: 'absolute',
            top: 40,
            alignSelf: 'flex-end',
            flexDirection: 'row',
        },
        language: {
            fontSize: 15,
            marginTop: 5,
            marginHorizontal: 5
            
        }
    })

    return (
    
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} acessible={false}>
        <KeyboardAwareScrollView style={{backgroundColor: "white"}}
          resetScrollToCoords={{x: 0, y: 0}}
          contentContainerStyle={styles.container}
          scrollEnabled={true}
        >
            <SafeAreaView style={styles.container}>

            <TranslateButton 
                value={isChinese}
                onValueChange={toggleSwitch}
            />

            <Image source={require('../images/ocmlogo.png')} style={styles.image} />

            <View style={[{justifyContent: 'center'}, {alignItems:'center'}]}>
                {isChinese ? (
                <Text style={[styles.title]}>
                    注册新中宣会员！
                </Text>
                ):(
                <Text style={[styles.title]}>
                    Register as a New OCM Member!
                </Text>
                )}
            {isChinese ? (
                <>
                <TextInput 
                    ref={lnameInput}
                    defaultValue=""
                    placeholder='加入姓氏'
                    onChangeText={(text) => {
                        setlname(text);
                    }}
                    keyboardType='default'
                    style={[styles.textinput]}
                />

                <TextInput 
                    ref={fnameInput}
                    defaultValue=""
                    placeholder='加入名字'
                    onChangeText={(text) => {
                        setfname(text);
                    }}
                    keyboardType='default'
                    style={[styles.textinput]}
                />

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

                <TextInput 
                    ref={emailInput}
                    defaultValue=""
                    placeholder='加入电子邮件'
                    onChangeText={(text) => {
                        setEmail(text);
                    }}
                    keyboardType='email-address'
                    style={[styles.textinput]}
                />

                </>
            ) : (
               <>
               <TextInput 
                    ref={lnameInput}
                    defaultValue=""
                    placeholder='Enter Last Name'
                    onChangeText={(text) => {
                        setlname(text);
                    }}
                    keyboardType='default'
                    style={[styles.textinput]}
                />

                <TextInput 
                    ref={fnameInput}
                    defaultValue=""
                    placeholder='Enter First Name'
                    onChangeText={(text) => {
                        setfname(text);
                    }}
                    keyboardType='default'
                    style={[styles.textinput]}
                />

                <TextInput 
                    ref={phoneInput}
                    defaultValue=""
                    placeholder='Enter Phone Number'
                    onChangeText={(text) => {
                        setNumber(text);
                    }}
                    keyboardType='number-pad'
                    style={[styles.textinput]}
                />

                <TextInput 
                    ref={emailInput}
                    defaultValue=""
                    placeholder='Enter Email'
                    onChangeText={(text) => {
                        setEmail(text);
                    }}
                    keyboardType='email-address'
                    style={[styles.textinput]}
                />

               </>
            )}
                
                
                

 

                <Pressable style={styles.button} onPress={()=>{
                    pickImage();
                }}>
                {isChinese ? (
                    <Text style={styles.label}>上传你脸的照片</Text>
                ) : (
                    <Text style={styles.label}>Upload an Image of Your Face</Text>
                )}
                    

                </Pressable>

                {isChinese ? (
                    <Text style={[{marginBottom: 10}, {fontSize: 15}]}>或者</Text>
                ) : (
                    <Text style={[{marginBottom: 10}, {fontSize: 15}]}>Or</Text>
                )}
                
                <Pressable style={styles.button} onPress={() => {
                    pickCamera();
                }}>
                {isChinese ? (
                    <Text style={styles.label}>打开相机</Text>
                ) : (
                    <Text style={styles.label}>Open Camera</Text>
                )}
                   
                </Pressable>




               {/*  {image && <Image source = {{uri: image}} style={{ width: 100, height: 100}} />} */}
                <Pressable style={[styles.button]} onPress={
                    () => {
                        console.log("first name: " + fname);
                        console.log("last name: " + lname);
                        console.log("Phone number " + number);
                        console.log("email: " + email);
                        handleRegistration();
                        navigation.navigate(RegisterSuccess);
                        phoneInput.text = '';
                    }}>
                {isChinese ? (
                    <Text style={styles.label}>注册</Text>
                ):(
                    <Text style={styles.label}>Register</Text>
                )}
                    
                </Pressable>
            </View>
            </SafeAreaView>
        </KeyboardAwareScrollView>
        </TouchableWithoutFeedback>
        
    )
}


export default RegisterScreen;