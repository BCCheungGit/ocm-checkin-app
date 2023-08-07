import {React} from 'react'
import {View, Text, StyleSheet, Pressable} from 'react-native';

import TranslateButton from '../globalComponents/translateButton';

import { useLang } from '../states/global';
import LoginScreen from './Login';



/*
TODO: REGISTER ROUTE COMING SOON
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
            marginBottom: 20,
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
        <View style={[styles.container]}>
        {isChinese ? (
        <>
            <TranslateButton 
            value={isChinese}
            onValueChange={toggleSwitch}
      />
        <Text style={[styles.title]}>
            注册成功
        </Text>
        <Pressable style={[styles.button]} 
            onPress = {() => {
                navigation.navigate("Login")
            }}
        ><Text style={[styles.label]}>回去</Text></Pressable>
        </>
        ) : (
        <>
            <TranslateButton 
                value={isChinese}
                onValueChange={toggleSwitch}
          />
            <Text style={[styles.title]}>
                Successfully Registered!
            </Text>
            <Pressable style={[styles.button]} 
                onPress = {() => {
                    navigation.navigate("Login")
                }}
            ><Text style={[styles.label]}>Go Back</Text></Pressable>
        </>
        )}
        </View>
        
    )
}

export default RegisterSuccess;