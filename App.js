/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as eva from '@eva-design/eva';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import React from 'react';
import 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reduxThunk from 'redux-thunk';
import HomeStack from './src/components/Pages/Home/HomeStack';
import LoginStack from './src/components/Pages/Login/LoginStack';
import reducers from './src/reducers/index';


const store = createStore(
    reducers, // Reducers
    {}, // Estado inicial
    applyMiddleware(reduxThunk)
);

const { Navigator, Screen } = createStackNavigator();

const NavigatorApp = () => {
    return (
        <Navigator
            headerMode='none'
            initialRouteName='LoginStack'
            screenOptions={{
                headerShown: false
            }}>
            <Screen name="LoginStack" component={LoginStack} />
            <Screen name="HomeStack" component={HomeStack} />
        </Navigator>
    )
}

const App = () => {
    return (
        <>
            <Provider store={store}>
                <IconRegistry icons={EvaIconsPack} />
                <ApplicationProvider {...eva} theme={eva.light}>
                    <NavigationContainer>
                        <NavigatorApp />
                    </NavigationContainer>
                </ApplicationProvider>
            </Provider>
        </>
    );
};
export default App;