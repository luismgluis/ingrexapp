import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
//import CreateUser from './CreateUser/CreateUserStack';
import LoginScreen from './LoginScreen';

const { Navigator, Screen } = createStackNavigator();
const LoginStack = () => {
  return (
    <Navigator
      headerMode='none'
      screenOptions={{
        headerShown: false
      }}>
      <Screen name="LoginScreen" component={LoginScreen} />

    </Navigator>
  );
};/*<Screen name="CreateUser" component={CreateUser} /> */
export default LoginStack;
