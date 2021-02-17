import axios from "axios";
import auth from "@react-native-firebase/auth";
import { Business } from "../libs/api/interfaces";

export const setCurrentBusiness = (business: Business) => (dispatch: any) => {
  if (business instanceof Business) {
    dispatch({
      type: "setCurrentBusiness",
      payload: business,
    });
  }
};
