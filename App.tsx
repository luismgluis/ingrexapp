/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useState } from "react";
import { LogBox, StatusBar } from "react-native";

import { IconRegistry } from "@ui-kitten/components";
import { EvaIconsPack } from "@ui-kitten/eva-icons";
import "react-native-gesture-handler";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import reduxThunk from "redux-thunk";
import reducers from "./src/reducers/index.js";

import AppProvider from "./AppProvider";

LogBox.ignoreLogs([
  "Non-serializable values were found in the navigation state",
  // name of the error/warning here, or a regex here
]);
LogBox.ignoreLogs([
  "Warning: isMounted(...) is deprecated",
  "RNDeviceInfo",
  /Require cycle:/,
  "Non-serializable values were found in the navigation state",
]);

const store = createStore(
  reducers, // Reducers
  {}, // Estado inicial
  applyMiddleware(reduxThunk),
);

const TAG = "APP PRINCIPAL";

const App: React.FC = () => {
  const [colorBar, setColorBar] = useState("#006793");
  const changeColor = React.useMemo(() => {
    return (color) => {
      setColorBar(color);
    };
  }, [setColorBar]);

  return (
    <>
      <StatusBar animated={true} backgroundColor={colorBar} />
      <Provider store={store}>
        <IconRegistry icons={EvaIconsPack} />
        <AppProvider setColorStatusBar={changeColor} />
      </Provider>
    </>
  );
};

export default App;
