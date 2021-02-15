import axios from "axios";
import auth from "@react-native-firebase/auth";

export const traerTodos = () => async (dispatch) => {
  const respuesta = await axios.get(
    "https://jsonplaceholder.typicode.com/users",
  );
  dispatch({
    type: "traer_usuarios",
    payload: respuesta.data,
  });
};

export const loginWithEmail = (user, password, callBackFail = null) => async (dispatch) => {
  console.log("login with ", user);
  auth() //'grajales805@gmail.com', 'elpepe'
    .signInWithEmailAndPassword(user, password)
    .then(() => {
      console.log("User signed in!");
      dispatch({
        type: "loginWithEmail",
        payload: "loged",
      });
    })
    .catch((error) => {
      console.log(error);

      if (error.code === "auth/email-already-in-use") {
        console.log("That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        console.log("That email address is invalid!");
      }

      console.error(error);
      if (callBackFail !== null) {
        callBackFail(false);
      }
    });
};

export const updateCurrentUser = (userData) => async (dispatch) => {
  if (typeof userData !== "undefined") {
    if (userData !== null) {
      dispatch({
        type: "updateCurrentUser",
        payload: userData,
      });
      return;
    }
  }
  console.log("Update Current User but is null or undefined");
};
