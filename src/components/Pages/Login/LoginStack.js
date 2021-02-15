import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CreateUser from "./CreateUser/CreateUserScreen";
import LoginScreen from "./LoginScreen";

const { Navigator, Screen } = createStackNavigator();

const LoginStack = (props) => {
  console.log("props", props);
  return (
    <Navigator headerMode="none" screenOptions={{ headerShown: false }}>
      <Screen name="LoginScreen" component={LoginScreen} />
      <Screen name="CreateUser" component={CreateUser} />
    </Navigator>
  );
};

export default LoginStack;
