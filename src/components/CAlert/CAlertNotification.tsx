import React from "react";
import { StyleSheet } from "react-native";
import { Text, useTheme } from "@ui-kitten/components";
import { AppMainModuleAlert } from "../../../AppMain";
import CButton from "../CButton/CButton";
import TeamIcon from "../Icons/others/TeamIcon";
import Panel from "../Panel/Panel";
import CAlert from "./CAlert";
import utils from "../../libs/utils/utils";

const styles = StyleSheet.create({
  buttonAction: { marginTop: 30 },
  textAction: {
    textAlign: "center",
    paddingHorizontal: 30,
  },
});
export type CAlertButtonType = {
  text?: string;
  onPress: () => void;
};

type CAlertType = {
  show: () => void;
  close: () => void;
};

export const CAlertQuestion = (
  title: string,
  text: string,
  icon?: JSX.Element,
  btn1?: CAlertButtonType,
  btn2?: CAlertButtonType,
  btn3?: CAlertButtonType,
  onClose?: () => void,
  canOutsideClose = false,
): CAlertType => {
  const moduleAlert = new AppMainModuleAlert();
  const JsxCom: React.FC<any> = () => {
    return (
      <CAlert
        canOutsideClose={canOutsideClose}
        onClose={() => moduleAlert.close()}
        scrollDown={200}>
        <Panel totalHeight={"80%"} paddingVertical={30} verticalCenter={true}>
          <Text style={styles.textAction} category="h4">
            {title}
          </Text>
          {icon}
          <Text style={styles.textAction} category="h6">
            {text}
          </Text>
          {btn1 && (
            <CButton
              style={styles.buttonAction}
              onPress={btn1.onPress}
              text={btn1.text}
            />
          )}
          {btn2 && (
            <CButton
              style={styles.buttonAction}
              onPress={btn2.onPress}
              text={btn2.text}
            />
          )}
          {btn3 && (
            <CButton
              style={styles.buttonAction}
              appeareance={"ghost"}
              onPress={btn3.onPress}
              text={btn3.text}
            />
          )}
        </Panel>
      </CAlert>
    );
  };
  const jsx = <JsxCom />;

  moduleAlert.setChild(jsx);
  return {
    show: () => {
      moduleAlert.setChild(jsx);
    },
    close: () => {
      if (onClose) onClose();
      moduleAlert.close();
    },
  };
};

export const CAlertEmpty = (
  child: JSX.Element,
  onClose?: () => void,
  canOutsideClose = false,
): CAlertType => {
  const moduleAlert = new AppMainModuleAlert();
  const JsxCom: React.FC<any> = () => {
    return (
      <CAlert
        canOutsideClose={canOutsideClose}
        onClose={moduleAlert.close}
        scrollDown={200}>
        <Panel totalHeight={"80%"} paddingVertical={30} verticalCenter={true}>
          {child}
        </Panel>
      </CAlert>
    );
  };
  const jsx = <JsxCom />;

  moduleAlert.setChild(jsx);
  return {
    show: () => {
      moduleAlert.setChild(jsx);
    },
    close: () => {
      if (onClose) onClose();
      moduleAlert.close();
    },
  };
};
