import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import HomeScreen from "./HomeScreen";
import LoadingPanel from "../../UI/LoadingPanel/LoadingPanel";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../libs/api/api";
import * as actionsGeneral from "../../../actions/actionsGeneral";
import utils from "../../../libs/utils/utils";
import { CommonActions } from "@react-navigation/native";

let lastCurrentBusinessId = "";
const cleanRoutes = (navigation, actualBusinessId = "") => {
  if (
    lastCurrentBusinessId !== "" &&
    actualBusinessId !== lastCurrentBusinessId
  ) {
    setTimeout(() => {
      lastCurrentBusinessId = "";
      navigation.dispatch(
        CommonActions.reset({
          index: 1,
          routes: [{ name: "HomeStack" }],
        }),
      );
    }, 100);
  }
};

const getScreens = (currentBusiness: string) => {
  const McurrentBusiness = "s";
  lastCurrentBusinessId = currentBusiness;
  if (currentBusiness == "") {
    return (
      <Screen
        key={"LoadingPanel" + McurrentBusiness}
        name={"LoadingPanelHomeStack" + McurrentBusiness}
        component={LoadingPanel}
      />
    );
  }
  return (
    <Screen
      key={"HomeScreenV" + McurrentBusiness}
      name={"HomeScreen" + McurrentBusiness}
      component={HomeScreen}
    />
  );
};

const navigatorBaseKey = utils.generateKey("HomeScreen");
const { Navigator, Screen } = createStackNavigator();

const TAG = "HOME STACK";

const HomeStack = ({ navigation, route }) => {
  const dispatch = useDispatch();

  const currentBusiness = useSelector((store) => {
    return store.generalApp.currentBusiness;
  });

  console.log(TAG, "navigation", navigation);

  cleanRoutes(navigation, currentBusiness.id);

  console.log(TAG, currentBusiness);
  const currentBusinessId: string = currentBusiness.id;
  /* */
  console.log(TAG, currentBusiness);
  useEffect(() => {
    api.getMyBusiness().then((result) => {
      console.log(TAG, result);
      if (result.length > 0) {
        if (api.currentBusiness.isEmpty()) {
          const firstBusiness = result[0];
          api.setCurrentBusiness(firstBusiness);
          dispatch(actionsGeneral.setCurrentBusiness(firstBusiness));
        }
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //const ss = utils.generateKey("s");

  const keyNav = `${navigatorBaseKey}`; //_${currentBusinessId}`;
  console.log(TAG, currentBusiness);
  return (
    <Navigator
      key={keyNav}
      headerMode="none"
      screenOptions={{ headerShown: false }}>
      {getScreens(currentBusinessId)}
    </Navigator>
  );
};
export default HomeStack;
