import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import LoginCreateAccount from "./LoginCreateAccount/LoginCreateAccountScreen";
import LoginScreen from "./LoginScreen/LoginScreen";
import { horizontalAnimation } from "../../libs/anim/ScreensAnimation";

const styles = StyleSheet.create({ container: {} });

const TAG = "LOGIN STACK";

const { Navigator, Screen } = createStackNavigator();

type LoginStackProps = {
  style?: StyleProp<ViewStyle>;
  navigation;
  route;
};
const LoginStack: React.FC<LoginStackProps> = ({
  style,
  navigation,
  route,
}) => {
  const SHORT_DURATION = 200;
  const options = {
    animations: {
      push: {
        elementTransitions: [
          {
            id: "description",
            alpha: {
              from: 0, // We don't declare 'to' value as that is the element's current alpha value, here we're essentially animating from 0 to 1
              duration: SHORT_DURATION,
            },
            translationY: {
              from: 16, // Animate translationY from 16dp to 0dp
              duration: SHORT_DURATION,
            },
          },
        ],
      },
    },
  };
  return (
    <Navigator
      headerMode="none"
      initialRouteName="LoginScreen"
      screenOptions={{
        headerShown: false,
        ...horizontalAnimation,
      }}>
      <Screen name="LoginCreateAccount" component={LoginCreateAccount} />
      <Screen name="LoginScreen" component={LoginScreen} />
    </Navigator>
  );
};
export default LoginStack;
