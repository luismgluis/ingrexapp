import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import React, { useState } from "react";
import CButton from "../CButton/CButton";

import { Avatar, Text, useTheme } from "@ui-kitten/components";
import Panel from "../Panel/Panel";
import UsersInfo from "../UsersInfo/UsersInfo";

const styles = StyleSheet.create({
  container: { flex: 1 },

  panelOptions: {
    height: 60,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    paddingVertical: 5,
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
  },
  userInfoPanel: {
    width: "80%",
    alignSelf: "center",
    paddingTop: 20,
  },
  panelOptionsButton: {
    flex: 1,
    height: 50,
    alignItems: "center",
  },
  panelBottom: { bottom: 0 },
});
const TAG = "";
type UsersAccessTopSearchProps = {
  style?: StyleProp<ViewStyle>;
};
const UsersAccessTopSearch: React.FC<UsersAccessTopSearchProps> = (props) => {
  const theme = useTheme();
  return (
    <>
      <Panel style={styles.container}>
        <UsersInfo
          title="Title"
          description="descrip"
          imageUri="https://firebasestorage.googleapis.com/v0/b/ingrex-app.appspot.com/o/others%2Fluismiguel_tatacoa.jpg?alt=media&token=d23abb8f-ea5a-4bab-9525-7c647a063079"
          style={styles.userInfoPanel}
        />
        <View>
          <Panel style={styles.panelOptions} level="5">
            <CButton text={"Exit"} style={styles.panelOptionsButton} />
            <CButton text={"Enter"} style={styles.panelOptionsButton} />
          </Panel>
        </View>
      </Panel>
    </>
  );
};
export default UsersAccessTopSearch;
