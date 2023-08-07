import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from './routes/Login';
import Welcome from './routes/Welcome';



import { useLoggedIn } from './states/global';

/*App.js: the main app that contains all routes and navigators. */



const Stack = createNativeStackNavigator();




function App() {

  //initialize global state
  const [auth, setAuth] = useLoggedIn();


  //check to see if user is authenticated using useEffect state hook
  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const value = await AsyncStorage.getItem('phone_number_key');
        if (value !== null) {
          setAuth(true) // Dispatch the login action to update the Redux store
          console.log('successfully authenticated!');
        }
      } catch (error) {
        console.log(error);
      }
    };

    checkAuthentication();
  }, []);

  //the main navigation container
  /*
  TODO: add register route
  */
  return (

      <NavigationContainer>
        <Stack.Navigator>
          {auth ? (
            <Stack.Screen name="Welcome" component={Welcome} options={{ headerShown: false }} />
          ) : (
            <>
              <Stack.Screen name="UnauthorizedRoutes" component={LoginScreen} options={{ headerShown: false }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>

  );
}

export default App;
