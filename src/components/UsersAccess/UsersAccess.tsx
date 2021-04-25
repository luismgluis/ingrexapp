import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import React, { useState } from "react";
import Panel from "../Panel/Panel";
import UsersAccessTopSearch from "./UsersAccessTopSearch";
import UsersAccessBottomInfo from "./UsersAccessBottomInfo";
const styles = StyleSheet.create({
  container: {},
  title: { paddingTop: 20 },
  panelOptions: {
    flexDirection: "row",
    width: "100%",
  },
  panelOptionsButton: {
    flex: 1,
    backgroundColor: "red",
    height: 50,
    alignItems: "center",
  },
});

const TAG = "USERS ACCESS";
type UsersAccessProps = {
  pagerFocus?: boolean;
};
const UsersAccess: React.FC<UsersAccessProps> = ({ pagerFocus }) => {
  return (
    <Panel style={styles.container}>
      <Panel totalHeight="50%">{pagerFocus && <UsersAccessTopSearch />}</Panel>
      <Panel style={styles.panelOptions} level="6" totalHeight="30%">
        <UsersAccessBottomInfo />
      </Panel>
    </Panel>
  );
};
export default UsersAccess;
