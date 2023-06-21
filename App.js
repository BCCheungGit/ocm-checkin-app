import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage'

import { createNativeStackNavigator } from '@react-navigation/native-stack';

import {useLoggedIn } from './states/global';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import LoginScreen from './routes/Login';
import Welcome from './routes/Welcome';
import RegisterScreen from './routes/Register';


import { MaterialCommunityIcons } from '@expo/vector-icons';

//initialize react native stack navigator.
const Stack = createNativeStackNavigator();

const Tab = createMaterialBottomTabNavigator();


const TabNavigator = () => (
  <Tab.Navigator initialRouteName='Login' backBehavior='none' activeColor='gray' inactiveColor='white' labelStyle={{fontSize: 12}} shifting={false} barStyle={{backgroundColor: "purple", height: 100, paddingBottom: 10}}>
    <Tab.Screen 
      name="Login" 
      component={LoginScreen}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="login" color={color} size={26} />
        ),
      }}
     />
    <Tab.Screen 
      name="Register" 
      component={RegisterScreen}
      options={{
        tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="account-plus" color={color} size={26} /> 
        ),
      }} 
    /> 
  </Tab.Navigator>
);


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
      <>

    <Stack.Screen name="UnauthorizedRoutes" component={TabNavigator} options={{headerShown: false}}/>

      </>
    )}

      </Stack.Navigator>
    </NavigationContainer>

    
  );
}

export default App;