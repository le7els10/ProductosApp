import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';
import ProtectedScreen from '../screens/ProtectedScreen';
import LoadingScreen from '../screens/LoadingScreen';

const Stack = createStackNavigator();

export const Navigator = () => {
  const {status} = useContext(AuthContext);

  // if (status === 'checking') {
  //   return <LoadingScreen />;
  // }

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: {
          backgroundColor: '#fff',
        },
      }}>
      {status == 'authenticated' ? (
        <Stack.Screen name="Protected" component={ProtectedScreen} />
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};
