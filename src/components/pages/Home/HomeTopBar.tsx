import { Button, Pressable, StyleSheet, View } from "react-native";
import React from "react";
import { Text } from "@ui-kitten/components";
import api from "../../../libs/api/api";
import { useCurrentGroup } from "../../hooks/useCurrentGroup";
import MenuIcon from "../../Icons/Home/MenuIcon";
import CButton from "../../ui/CButton/CButton";
import Panel from "../../ui/Panel/Panel";
import { useTheme } from "./../../hooks/useTheme";

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    width: "100%",
    height: 50,
    padding: 5,
  },
  panelRight: {
    flex: 1,
    alignItems: "flex-end",
    flexDirection: "row-reverse",
  },
  titlePanel: {
    flexDirection: "row",
    justifyContent: "center",
  },
  titleText: { textAlign: "center" },
  panelGroupName: {
    justifyContent: "center",
    height: "100%",
  },
  paper: {
    flex: 12,
    flexDirection: "column",
  },
});
const TAG = "HOME TOP BAR";
type HomeTopBarProps = {
  //
};
const HomeTopBar: React.FC<HomeTopBarProps> = (props) => {
  const theme = useTheme();
  const group = useCurrentGroup();
  const groupName = group.name ? group.name : "";
  const onPress = () => {
    //
  };
  return (
    <Panel style={styles.titleContainer} level="6">
      <View style={styles.titlePanel}>
        <Text style={styles.titleText} category="h3">
          {" Accessa"}
        </Text>
        <Pressable style={styles.panelGroupName} onPress={onPress}>
          <Text category="h6">{groupName}</Text>
        </Pressable>
      </View>
      <View style={styles.panelRight}>
        <View>
          <CButton
            imageInsertComponent={() => (
              <MenuIcon
                color={theme["color-primary-500"]}
                width={20}
                height={20}
              />
            )}
            onPress={() => api.logOut()}
          />
        </View>
      </View>
    </Panel>
  );
};
export default HomeTopBar;
