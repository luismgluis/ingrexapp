import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import React from "react";
import { Card, Text } from "@ui-kitten/components";
import Panel from "../Panel/Panel";
import CButton from "../CButton/CButton";

const styles = StyleSheet.create({ container: {} });

const TAG = "USER REGISTER OTHER DATA";
type UserRegisterOtherDataProps = {
  style?: StyleProp<ViewStyle>;
};
const UserRegisterOtherData: React.FC<UserRegisterOtherDataProps> = ({
  style,
}) => {
  return (
    <Panel>
      <Text category="label">Other Data</Text>
      <Card style={style}>
        <CButton appeareance="ghost" text="Add" />
      </Card>
    </Panel>
  );
};
export default UserRegisterOtherData;
