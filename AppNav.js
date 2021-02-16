import React, { useEffect, useCallback } from "react";
import "react-native-gesture-handler";
import { createStackNavigator } from "@react-navigation/stack";

import { useSelector, useDispatch } from "react-redux";

import HomeStack from "./src/components/Pages/Home/HomeStack";
import LoginStack from "./src/components/Pages/Login/LoginStack";
import Gallery from "./src/components/Pages/Gallery/GalleryStack";

import * as sessionActions from "./src/actions/actionsCurrentSession";
import auth from "@react-native-firebase/auth";

const { Navigator, Screen } = createStackNavigator();

const AppNav = () => {
  const dispatch = useDispatch();

  const myuser = useSelector((store) => {
    return store.currentSession.user;
  });
  const currenBusiness = useSelector((store) => {
    return store.generalApp.currentBusiness;
  });

  const authChange = useCallback(() => {
    auth().onAuthStateChanged((data) => {
      dispatch(sessionActions.updateCurrentUser(data));
    });
  });

  useEffect(() => {
    authChange();
  }, []);

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
  );

};
export default AppNav;
