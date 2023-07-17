import {React} from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native';

import TranslateButton from '../globalComponents/translateButton';

import { useLang } from '../states/global';
import LoginScreen from './Login';

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


function RegisterSuccess({navigation}) {
    const [isChinese, setIsChinese] = useLang();

    const toggleSwitch = () => {
        setIsChinese(previousState => !previousState)
      }

    return (
        <View styles={[styles.container]}>
            <TranslateButton 
                value={isChinese}
                onValueChange={toggleSwitch}
          />
            <Text styles={[styles.title]}>
                Successfully Registered for OCM!
            </Text>
            <Pressable styles={[styles.button]} 
                onPress = {() => {
                    navigation.navigate(LoginScreen)
                }}
            ><Text styles={[styles.label]}>Go Back</Text></Pressable>
        </View>
    )
}

export default RegisterSuccess;