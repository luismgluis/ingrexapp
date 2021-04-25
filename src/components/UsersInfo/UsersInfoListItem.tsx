import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import React from "react";
import Panel from "../Panel/Panel";
import { Avatar, Text, useTheme } from "@ui-kitten/components";
import utils from "../../libs/utils/utils";
import { ThemeProvider } from "@react-navigation/native";

const styles = StyleSheet.create({
  container: {},
  panelProfile: {
    flex: 1,
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 2,
  },
  panelProfileInfo: { paddingLeft: 15 },
});

const TAG = "USERS INFO";
type UsersInfoProps = {
  style?: StyleProp<ViewStyle>;
  title: string;
  description: string;
  footerText?: string;
  imageUri: string;
};
const UsersInfoListItem: React.FC<UsersInfoProps> = ({
  style,
  title,
  description,
  footerText = "",
  imageUri,
}) => {
  const theme = useTheme();
  const panelProfileStyles = {
    ...styles.panelProfile,
    ...utils.objects.cloneObject(style),
    borderBottomColor: theme["color-basic-500"],
  };
  return (
    <Panel style={panelProfileStyles} level="5">
      <Avatar source={{ uri: imageUri }} size="giant" />
      <View style={styles.panelProfileInfo}>
        <Text category="h5">{title}</Text>
        <Text category="h6">{description}</Text>
        {footerText !== "" && <Text category="label">{footerText}</Text>}
      </View>
    </Panel>
  );
};
export default UsersInfoListItem;
