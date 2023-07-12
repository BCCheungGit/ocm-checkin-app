import {React} from 'react'
import {Switch, Pressable, TouchableWithoutFeedback, View, Text, TextInput, Keyboard, StyleSheet, Image} from 'react-native';

import TranslateButton from '../globalComponents/translateButton';

function RegisterSuccess() {
    return (
        <View>
            <TranslateButton />
            <Text>
                Successfully Registered for OCM!
            </Text>
        </View>
    )
}

export default RegisterSuccess;