import axios from "axios";
import auth from "@react-native-firebase/auth";
const TAG = "ACTIONS CURRENT SESSION";
export const traerTodos = () => async (dispatch) => {
  const respuesta = await axios.get(
    "https://jsonplaceholder.typicode.com/users",
  );
  dispatch({
    type: "traer_usuarios",
    payload: respuesta.data,
  });
};

export const loginWithEmail = (user, password, callBack = null) => async (dispatch) => {
  auth() //'grajales805@gmail.com', 'elpepe'
    .signInWithEmailAndPassword(user, password)
    .then(() => {
      console.log(TAG, "User signed in!");
      const me = auth().currentUser;
      dispatch({
        type: "loginWithEmail",
        payload: me,
      });
      if (callBack !== null) {
        callBack(true);
      }
    })
    .catch((error) => {
      console.log(TAG, error);

      if (error.code === "auth/email-already-in-use") {
        console.log(TAG, "That email address is already in use!");
      }

      if (error.code === "auth/invalid-email") {
        console.log(TAG, "That email address is invalid!");
      }

      if (callBack !== null) {
        callBack(false);
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
  console.log(TAG, "Update Current User but is null or undefined");
};
