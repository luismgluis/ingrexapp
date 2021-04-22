import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
  BottomNavigation,
  BottomNavigationTab,
  Icon,
  Layout,
} from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import AppConfig from "../../../libs/config/AppConfig";
import Utils from "../../../libs/utils/utils";
import PerfilScreen from "../Perfil/PerfilScreen";
import SalesScreen from "../Sales/SalesScreen";
const { Navigator, Screen } = createBottomTabNavigator();

const TAG = "HOMESCREEN";

const pages = {
  stats: {
    title: AppConfig.TextFields.pages.home.stats,
    screenName: AppConfig.TextFields.pages.home.stats,
    component: SalesScreen,
    iconName: "star",
  },
  sales: {
    title: AppConfig.TextFields.pages.home.sales,
    screenName: AppConfig.TextFields.pages.home.sales,
    component: SalesScreen,
    iconName: "shopping-cart",
  },
  perfil: {
    title: AppConfig.TextFields.pages.home.perfil,
    screenName: AppConfig.TextFields.pages.home.perfil,
    component: PerfilScreen,
    iconName: "star",
  },
};


function getIcon(iconName = "star") {
  return (props) => <Icon {...props} name={iconName} />;
}

const BottomTabBar = ({ navigation, state }) => {
  const [visibleTitles, setVisibleTitles] = useState(false);

  const onSelectScreen = (index) => {

    setVisibleTitles(true)
    setTimeout(() => {
      setVisibleTitles(false)
    }, 3000);

    navigation.navigate(state.routeNames[index]);
  }
  return (
    <BottomNavigation
      style={{ maxHeight: visibleTitles ? 60 : 35 }}
      selectedIndex={state.index}
      onSelect={onSelectScreen}>
      <BottomNavigationTab
        title={visibleTitles ? pages.stats.screenName : ""}
        icon={getIcon(pages.stats.iconName)}
      />
      <BottomNavigationTab
        title={visibleTitles ? pages.sales.screenName : ""}
        icon={getIcon(pages.sales.iconName)}
      />
      <BottomNavigationTab
        title={visibleTitles ? pages.perfil.screenName : ""}
        icon={getIcon(pages.perfil.iconName)}
      />
    </BottomNavigation>
  );
};

const HomeScreen = () => {
  //const theTabs = generateBottomNavigationTabs()
  return (
    <Navigator tabBar={(props) => <BottomTabBar {...props} />}>
      <Screen
        name={pages.stats.screenName.toUpperCase()}
        component={pages.stats.component}
      />
      <Screen
        name={pages.sales.screenName.toUpperCase()}
        component={pages.sales.component}
      />
      <Screen
        name={pages.perfil.screenName.toUpperCase()}
        component={pages.perfil.component}
      />
    </Navigator>
  );
};

export default HomeScreen;
