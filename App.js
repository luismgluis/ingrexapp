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
import HomeStack from './src/components/Home/HomeStack';
import LoginStack from './src/components/Login/LoginStack';

const { Navigator, Screen } = createStackNavigator();

const NavigatorTop = () => {
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
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider {...eva} theme={eva.light}>
        <NavigationContainer>
          <NavigatorTop />
        </NavigationContainer>
      </ApplicationProvider>
    </>
  );
};
export default App;
