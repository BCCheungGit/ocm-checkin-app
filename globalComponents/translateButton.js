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
        container: {
            position: 'absolute',
            top: 30,
            right: 30,

        },
        switch: {
            alignSelf: 'flex-end',
            flexDirection: 'row',
        },
        language: {
            fontSize: 15,
             
        }
    })

    return (
        <View style={styles.container}> 
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
        </View>
    );



}

export default TranslateButton;