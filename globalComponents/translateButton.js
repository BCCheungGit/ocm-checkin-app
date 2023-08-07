import React from 'react';
import {Switch, View, Text,StyleSheet} from 'react-native';


/* Translate Button: creates a global translate switch button that uses the following styles.
*/
function TranslateButton({value, onValueChange }) {
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