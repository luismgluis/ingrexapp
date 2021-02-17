import { createStackNavigator } from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import HomeScreen from "./HomeScreen";
import LoadingPanel from "./../../UI/LoadingPanel/LoadingPanel";
import { useDispatch, useSelector } from "react-redux";
import api from "../../../libs/api/api";
import * as actionsGeneral from "./../../../actions/actionsGeneral";

const { Navigator, Screen } = createStackNavigator();
const HomeStack = () => {
  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  const currentBusiness = useSelector((store) => {
    return store.generalApp.currentBusiness;
  });
  useEffect(() => {
    api.getMyBusiness().then((result) => {
      if (result.length > 0) {
        dispatch(actionsGeneral.setCurrentBusiness(result[0]));
      }
    })
  }, [])
  return (
    <Navigator headerMode="none" screenOptions={{ headerShown: false }}>
      {ready && <Screen name="HomeScreen" component={HomeScreen} />}
      {!ready && <Screen name="LoadingPanelHomeStack" component={LoadingPanel} />}
    </Navigator>
  );
};
export default HomeStack;
