import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage'


import {useLoggedIn } from './states/global';


import LoginScreen from './routes/Login';
import Welcome from './routes/Welcome';

//initialize react native stack navigator.
const Stack = createNativeStackNavigator();

function App() {
  const [auth, setAuth] = useLoggedIn();

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('phone_number_key');
      if (value !== null) {
        setAuth(true);
        console.log("successfully authenticated!")
      }
    } catch(error) {
        console.log(error);
    }
  }
  getData();

  //When the user is unauthenticated, only the login screen route EXISTS. They cannot force route to Welcome. (secure)
  return (
    <NavigationContainer>
    <Stack.Navigator>
    {auth ? 
    (<Stack.Screen name="Welcome" component={Welcome} options={{headerShown: false}}/>
    ) : (
    <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}}/>)}  
      
      </Stack.Navigator>
    </NavigationContainer>

    
  );
}

export default App;