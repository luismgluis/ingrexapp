import {
  Button,
  Divider,
  Icon,
  Input,
  Layout,
  Spinner,
  Text,
} from "@ui-kitten/components";
import React, { useState, useEffect } from "react";
import { StyleSheet, TouchableWithoutFeedback, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import * as sessionActions from "./../../../actions/actionsCurrentSession";


const LoginScreen = (props) => {
  console.log("props", props);

  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [password, setPassword] = useState("elpepe");
  const [user, setUser] = useState("grajales805@gmail.com");

  const [loadSpinner, setLoadSpinner] = useState(false);

  const dispatch = useDispatch();

  const toggleSecureEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };
  const checkLogin = () => {
    //ImagePicker.getAlbum();props.navigation.navigate("GalleryCustom");
    setLoadSpinner(true);
    setTimeout(() => {
      setLoadSpinner(false);
    }, 3000);
    dispatch(sessionActions.loginWithEmail(user, password, () => {
      setLoadSpinner(false);
      Alert.alert(
        "Login fail",
        "Check data and try again",
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ],
        { cancelable: false }
      );
    }));
  };
  const createAccount = () => {
    return "";
  };
  //Inner Components -------------------------------------
  const alertIcon = (props1) => (
    <Icon {...props1} name="alert-circle-outline" />
  );
  const renderIcon = (props1) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props1} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );

  return (
    <Layout style={styles.container}>
      <Text category="h4">Bienvenido</Text>
      <Divider style={styles.divider} />
      <Text category="h6">Ingresa tus datos</Text>
      <Layout style={styles.panel}>
        <Input
          style={styles.input}
          value={user}
          label="User"
          placeholder="Example@email.com"
          onChangeText={(nextValue) => setUser(nextValue)}
        />
        <Input
          style={styles.input}
          value={password}
          label="Password"
          placeholder="Place your Text"
          caption="Should contain at least 8 symbols"
          accessoryRight={renderIcon}
          captionIcon={alertIcon}
          secureTextEntry={secureTextEntry}
          onChangeText={(nextValue) => setPassword(nextValue)}
        />
      </Layout>
      {!loadSpinner && (
        <>
          <Button onPress={checkLogin}>Login</Button>
          <Divider style={styles.divider} />
        </>
      )}
      {loadSpinner && (
        <>
          <Spinner size="giant" status="info" />
          <Button appearance="ghost" onPress={createAccount}>Create Account</Button>
        </>
      )}
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  panel: { width: "80%" },
  input: { marginBottom: 30 },
  divider: { paddingVertical: 20 },
});
export default LoginScreen;
