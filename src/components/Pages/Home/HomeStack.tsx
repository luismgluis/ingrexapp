import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import HomeScreen from "./HomeScreen";
import LoadingPanel from "../../UI/LoadingPanel/LoadingPanel";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../libs/api/api";
import * as actionsGeneral from "../../../actions/actionsGeneral";
import { Business } from "../../../libs/api/interfaces";
import utils from "../../../libs/utils/utils";

const navigatorBaseKey = utils.generateKey("HomeScreen");
const { Navigator, Screen } = createStackNavigator();
const TAG = "HOME STACK";
const HomeStack = () => {
  const dispatch = useDispatch();

  const currentBusiness: Business = useSelector((store) => {
    return store.generalApp.currentBusiness;
  });
  console.log(TAG, currentBusiness);
  useEffect(() => {
    api.getMyBusiness().then((result) => {
      console.log(TAG, result);
      if (result.length > 0) {
        dispatch(actionsGeneral.setCurrentBusiness(result[0]));
      }
    });
  }, []);
  const keyNav = `${navigatorBaseKey}_${currentBusiness.id}`;

  return (
    <Navigator
      key={keyNav}
      headerMode="none"
      screenOptions={{ headerShown: false }}>
      {!currentBusiness.isEmpty() && (
        <Screen name="HomeScreen" component={HomeScreen} />
      )}
      {currentBusiness.isEmpty() && (
        <Screen name="LoadingPanelHomeStack" component={LoadingPanel} />
      )}
    </Navigator>
  );
};
export default HomeStack;
