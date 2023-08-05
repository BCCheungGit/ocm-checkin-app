import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import { login, logout } from './redux/authSlice';
import LoginScreen from './routes/Login';
import Welcome from './routes/Welcome';




import { useLoggedIn } from './states/global';

const Stack = createNativeStackNavigator();




function App() {


  const [auth, setAuth] = useLoggedIn();


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
