import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import React from "react";
import Panel from "../Panel/Panel";
import { Avatar, Text } from "@ui-kitten/components";
import utils from "../../libs/utils/utils";

const styles = StyleSheet.create({
  container: {},
  panelProfile: {
    flex: 1,
    flexDirection: "row",
  },
  panelProfileInfo: { paddingLeft: 10 },
});

const TAG = "USERS INFO";
type UsersInfoProps = {
  style?: StyleProp<ViewStyle>;
  title: string;
  description: string;
  imageUri: string;
};
const UsersInfo: React.FC<UsersInfoProps> = ({
  style,
  title,
  description,
  imageUri,
}) => {
  const panelProfileStyles = {
    ...styles.panelProfile,
    ...utils.objects.cloneObject(style),
  };
  return (
    <Panel style={panelProfileStyles} level="5">
      <Avatar source={{ uri: imageUri }} size="giant" />
      <View style={styles.panelProfileInfo}>
        <Text category="h4">{title}</Text>
        <Text category="h6">{description}</Text>
      </View>
    </Panel>
  );
};
export default UsersInfo;
