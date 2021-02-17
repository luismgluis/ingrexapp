import axios from "axios";
import auth from "@react-native-firebase/auth";
import { Business } from "../libs/api/interfaces";
import api from "../libs/api/api";

export const setCurrentBusiness = (business: Business) => (dispatch: any) => {
  if (business instanceof Business) {
    api.setCurrentBusiness(business);
    dispatch({
      type: "setCurrentBusiness",
      payload: business,
    });
  }
};
