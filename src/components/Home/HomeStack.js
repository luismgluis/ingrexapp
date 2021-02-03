import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import HomeScreen from './HomeScreen';

const { Navigator, Screen } = createStackNavigator();
const LoginStack = () => {
    return (
        <Navigator
            headerMode='none'
            screenOptions={{
                headerShown: false
            }}>
            <Screen name="HomeScreen" component={HomeScreen} />
        </Navigator>
    );
};
export default LoginStack;