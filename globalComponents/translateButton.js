import React, {useState, useRef,} from 'react';
import {Switch, Pressable, TouchableWithoutFeedback, View, Text, TextInput, Keyboard, StyleSheet, Image} from 'react-native';
import { useLang } from '../states/global';


function TranslateButton({value, onValueChange }) {
 /*   
    const [isChinese, setIsChinese] = useLang();

    const toggleSwitch = () => {
        setIsChinese(previousState => !previousState)
        console.log(isChinese);
    }
*/
    
    const styles = StyleSheet.create({
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
        <View style={styles.switch}>
            <Text style={styles.language}>Eng</Text>
            <Switch 
                trackColor={{false: 'purple', true: 'purple'}}
                ios_backgroundColor='purple'
                onValueChange={onValueChange}
                value={value}
            >
            </Switch>
            <Text style={styles.language}>中文</Text>
        </View>
    );



}

export default TranslateButton;