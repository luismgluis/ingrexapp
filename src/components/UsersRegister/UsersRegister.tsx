import { StyleSheet } from "react-native";
import React from "react";
import Panel from "../Panel/Panel";
import { Text } from "@ui-kitten/components";
import CInput from "../CInput/CInput";
import CButton from "../CButton/CButton";
import UserRegisterOtherData from "./UserRegisterOtherData";

const styles = StyleSheet.create({
  container: {},
  panel: { width: "80%" },
  panelTitle: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
});

const TAG = "USERS REGISTER";
type UsersRegisterProps = {
  pagerFocus?: boolean;
};
const UsersRegister: React.FC<UsersRegisterProps> = ({ pagerFocus }) => {
  return (
    <Panel horizontalCenter={true} style={styles.container}>
      <Panel style={styles.panelTitle} level="6">
        <Text category="h3">Register User</Text>
      </Panel>
      <Panel totalHeight={150} style={styles.panel}>
        <Panel withScroll={true} paddingVertical={30}>
          <CInput
            paddingVertical={20}
            value=""
            label="Name"
            placeholder="Jhonn Doo"
          />
          <CInput
            paddingVertical={20}
            value=""
            label="Sector"
            placeholder="F204"
          />
          <CInput
            paddingVertical={20}
            value=""
            label="ID Card"
            placeholder="1122334444"
          />
          <CInput
            paddingVertical={20}
            value=""
            label="QR"
            placeholder="123654"
          />
          <UserRegisterOtherData />
          <CButton paddingVertical={20} text="Register" />
        </Panel>
      </Panel>
    </Panel>
  );
};
export default UsersRegister;
