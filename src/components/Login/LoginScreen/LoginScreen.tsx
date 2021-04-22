import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import Panel from "../../Panel/Panel";
import { Divider, Icon, Input, Spinner, Text } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import CButton from "../../CButton/CButton";
import AppIcon from "../../Icons/AppIcon/AppIcon";
import api from "../../../libs/api/api";
import ThemeToggle from "../../ThemeToggle/ThemeToggle";
import { useFocusEffect } from "@react-navigation/core";
import CustomBackHandler from "../../../libs/modules/CustomBackHandler";
import LoginInputSecure from "../LoginInputSecure/LoginInputSecure";
import CInput from "../../CInput/CInput";

const styles = StyleSheet.create({
  spinner: { padding: 30 },
  input: { marginBottom: 30 },
  container: { padding: 50 },
  warningText: { marginTop: 20 },
  icon: { marginBottom: 20 },
  createButton: { paddingTop: 20 },
  panelTheme: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
});

const TAG = "LOGIN";
type LoginProps = {
  navigation;
  route;
};
const LoginScreen: React.FC<LoginProps> = ({ navigation, route }) => {
  useFocusEffect(
    CustomBackHandler(() => {
      return true;
    }),
  );
  const [password, setPassword] = useState("20081601");
  const [user, setUser] = useState("pruebasmysoftdnd@gmail.com");
  const [warningInfo, setWarningInfo] = useState("");

  const [loading, setLoading] = useState(false);
  const checkLogin = React.useCallback(() => {
    const alertWarning = () => {
      setLoading(false);
      setWarningInfo("Login failed");
      setTimeout(() => {
        setWarningInfo("");
      }, 2000);
    };
    setLoading(true);
    api
      .checkLoginByEmail(user, password)
      .then((result) => {
        if (result) {
          setLoading(false);
          navigation.navigate("Home");
          return;
        }
        alertWarning();
      })
      .catch(() => {
        alertWarning();
      });
  }, [navigation, password, user]);
  const goCreateAccount = () => {
    navigation.navigate("LoginCreateAccount");
  };

  return (
    <Panel totalHeight={0}>
      <Panel
        verticalCenter={true}
        paddingHorizontal={50}
        style={styles.container}>
        <AppIcon style={styles.icon} width={100} height={100} />
        <Text category="h4">EnRed</Text>
        {!loading && (
          <>
            <CInput
              style={styles.input}
              value={user}
              label="User"
              placeholder="Example@email.com"
              onChangeText={(nextValue) => setUser(nextValue)}
            />
            <LoginInputSecure
              label="Password"
              placeholder="*******"
              password={password}
              setPassword={setPassword}
            />
            <CButton text="Login" onPress={checkLogin} />
            {warningInfo !== "" && (
              <Text style={styles.warningText} status="danger">
                {warningInfo}
              </Text>
            )}
            <CButton
              style={styles.createButton}
              appeareance="ghost"
              text="Create account"
              onPress={goCreateAccount}
            />
            <View style={styles.panelTheme}>
              <ThemeToggle />
            </View>
          </>
        )}
        {loading && (
          <View style={styles.spinner}>
            <Spinner size="giant" />
          </View>
        )}
      </Panel>
    </Panel>
  );
};
export default LoginScreen;
