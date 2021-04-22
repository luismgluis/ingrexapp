import { useNavigationState, useRoute } from "@react-navigation/core";
import React from "react";
import { BackHandler } from "react-native";
import utils from "../utils/utils";
import { moveToBackground } from "./MoveAppToBackground";
const TAG = "CUSTOM BACK HANDLER";
export default function CustomBackHandler(callBack: () => boolean): () => void {
  //const state = useNavigationState((state) => state);
  //const croute = useRoute();
  const resultCallBack = React.useCallback(() => {
    const backAction = (): boolean => {
      try {
        if (callBack()) {
          moveToBackground();
        }
      } catch (error) {
        console.error(TAG, error);
      }
      return true;
    };
    BackHandler.addEventListener("hardwareBackPress", backAction);

    return () => {
      BackHandler.removeEventListener("hardwareBackPress", backAction);
    };
  }, [callBack]);
  return resultCallBack;
}
