import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout,
} from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import { Text } from "react-native-svg";
import AppConfig from "../../../libs/config/AppConfig";
import Utils from "../../../libs/utils/utils";
import PerfilScreen from "../Perfil/PerfilScreen";
const { Navigator, Screen } = createBottomTabNavigator();

const pages = {
  stats: {
    title: AppConfig.TextFields.pages.home.stats,
    screenName: AppConfig.TextFields.pages.home.stats,
    component: PerfilScreen,
    iconName: "star",
  },
  sales: {
    title: AppConfig.TextFields.pages.home.sales,
    screenName: AppConfig.TextFields.pages.home.sales,
    component: PerfilScreen,
    iconName: "star",
  },
  perfil: {
    title: AppConfig.TextFields.pages.home.perfil,
    screenName: AppConfig.TextFields.pages.home.perfil,
    component: PerfilScreen,
    iconName: "star",
  },
};

let screens = [];
let tabs = [];

function initilializeTabsScreens() {
  for (const key in pages) {
    if (!Object.hasOwnProperty.call(pages, key)) {
      continue;
    }
    const page = pages[key];
    screens.push(
      <Screen
        name={Utils.generateKey(page.screenName + key)}
        key={Utils.generateKey(key)}
        component={page.component}
      />,
    );
    tabs.push(
      <BottomNavigationTab
        title={page.title}
        key={Utils.generateKey(key)}
        icon={getIcon(page.iconName)}
      />,
    );
    console.log("creating tabs");
  }
}
initilializeTabsScreens();

function getIcon(iconName = "star") {
  return (props) => <Icon {...props} name={iconName} />;
}

const BottomTabBar = ({ navigation, state }) => {
  return (
    <BottomNavigation
      selectedIndex={state.index}
      onSelect={(index) => navigation.navigate(state.routeNames[index])}>
      {tabs}
    </BottomNavigation>
  );
};

const TabNavigator = () => {
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      {screens}
    </Navigator>
  );
};

const HomeScreen = () => {
  return <TabNavigator />;
};

export default HomeScreen;
