import React, { useEffect, useMemo } from "react";

import { SafeAreaView } from "react-native-safe-area-context";
import * as eva from "@eva-design/eva";
import { NavigationContainer } from "@react-navigation/native";
import { ApplicationProvider } from "@ui-kitten/components";

import "react-native-gesture-handler";

import { Host } from "react-native-portalize";

import { useSelector } from "react-redux";

import AppNav from "./AppNav";
import themeStyleOne from "./src/themes/one.json";
import themeStyleTwo from "./src/themes/two.json";
import FatherPanel from "./src/components/FatherPanel/FatherPanel";
import utils from "./src/libs/utils/utils";
import AppMain from "./AppMain";

const TAG = "APP PROVIDER";

type AppProviderProps = {
  setColorStatusBar;
};
const styleFlex = {
  flex: 1,
  backgroundColor: "#002345",
};
const AppProvider: React.FC<AppProviderProps> = ({ setColorStatusBar }) => {
  const themeNumber = useSelector<number>((state) => {
    const nstate = utils.objects.cloneObject(state);
    return Number(nstate.generalValues.theme);
  });

  useEffect(() => {
    if (themeNumber === 0) {
      setColorStatusBar("#006793");
      return;
    }
    setColorStatusBar("#E84545");
  }, [setColorStatusBar, themeNumber]);

  const theme = useMemo(() => {
    if (themeNumber === 0) {
      return {
        ...eva.light,
        ...themeStyleOne,
      };
    }

    return {
      ...eva.dark,
      ...themeStyleTwo,
    };
  }, [themeNumber]);
  return (
    <ApplicationProvider {...eva} theme={theme}>
      <Host>
        <SafeAreaView style={styleFlex}>
          <AppMain>
            <NavigationContainer>
              <AppNav />
            </NavigationContainer>
          </AppMain>
        </SafeAreaView>
      </Host>
    </ApplicationProvider>
  );
};

export default AppProvider;
