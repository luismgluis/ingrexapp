import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import HomeScreen from "./HomeScreen";

const { Navigator, Screen } = createStackNavigator();
const HomeStack = () => {
  return (
    <Navigator headerMode="none" screenOptions={{ headerShown: false }}>
      <Screen name="HomeScreen" component={HomeScreen} />
    </Navigator>
  );
};
export default HomeStack;
