/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { ApplicationProvider, IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import React, { useEffect, useCallback } from "react";
import "react-native-gesture-handler";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import { useSelector, useDispatch } from "react-redux";

import HomeStack from "./src/components/Pages/Home/HomeStack";
import LoginStack from "./src/components/Pages/Login/LoginStack";
import Gallery from "./src/components/Pages/Gallery/GalleryStack";
import reducers from "./src/reducers/index";
import * as sessionActions from "./src/actions/actionsCurrentSession";
import auth from "@react-native-firebase/auth";

const store = createStore(
  reducers, // Reducers
  {}, // Estado inicial
  applyMiddleware(reduxThunk),
);

const { Navigator, Screen } = createStackNavigator();

const NavigatorApp = () => {
  const dispatch = useDispatch();
  const myuser = useSelector((store) => {
    return store.currentSession.user;
  });
  const authChange = useCallback(() => {
    auth().onAuthStateChanged((data) => {
      dispatch(sessionActions.updateCurrentUser(data));
    });
  })
  useEffect(() => {
    authChange();
  }, [])

  const getScreen = () => {
    console.log("getscreen");
    if (typeof myuser?.uid !== "undefined") {
      if (myuser.uid !== "") {
        return <Screen name="HomeStack" component={HomeStack} />;
      }
    }
    return <Screen name="LoginStack" component={LoginStack} />;
  };
  return (
    <Navigator
      headerMode="none"
      initialRouteName="LoginStack"
      screenOptions={{ headerShown: false }}>
      {getScreen()}
      <Screen name="GalleryCustom" component={Gallery} />
    </Navigator>
  ); //
};

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
