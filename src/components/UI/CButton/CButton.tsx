import React from "react";
import { Button, Icon } from "@ui-kitten/components";
import { StyleProp, View, ViewStyle } from "react-native";

const TAG = "CBUTTON";
export type ButtonStyleType = {
  basic;
  primary;
  success;
  info;
  warning;
  danger;
  control;
};
export interface CButtonStyleType {
  buttonBorderRadius?: number;
  boxMarginHorizontal?: number;
  width?: number;
  height?: number;
}

export interface CButtonProps {
  icon: string;
  type?:
    | "basic"
    | "primary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "control";
  size?: "tiny" | "small" | "medium" | "large" | "giant";
  textButton?: string;
  styles?: CButtonStyleType;
  onlyIcon?: boolean;
  onPress?: () => void;
}

const CButton = ({
  icon,
  type = "basic",
  onlyIcon = false,
  styles = {},
  textButton = "",
  size = "medium",
  onPress = () => {},
}: CButtonProps) => {
  const context = this;

  function MyIcon(icon) {
    return (props) => (
      <Icon {...props} name={icon} /> //'star' />
    );
  }

  let theAppearance: string = "filled";
  if (onlyIcon) {
    theAppearance = "ghost";
  }

  let newBoxStyles = {};

  if (typeof styles.boxMarginHorizontal !== "undefined") {
    newBoxStyles["marginHorizontal"] = styles.boxMarginHorizontal;
  }
  if (typeof styles.width !== "undefined") {
    newBoxStyles["width"] = styles.width;
  }
  if (typeof styles.height !== "undefined") {
    newBoxStyles["height"] = styles.height;
  }

  let newButtonStyles = {};
  if (typeof styles.width !== "undefined") {
    newButtonStyles["width"] = styles.width;
  }
  if (typeof styles.height !== "undefined") {
    newButtonStyles["height"] = styles.height;
  }
  if (typeof styles.buttonBorderRadius !== "undefined") {
    newButtonStyles["borderRadius"] = styles.buttonBorderRadius;
  } else {
    newButtonStyles["borderRadius"] = 4;
  }
  //console.log(TAG, "Styles", styles);

  return (
    <Button
      style={{ ...newButtonStyles }}
      onPress={onPress}
      status={type}
      size={size}
      appearance={theAppearance}
      accessoryLeft={MyIcon(icon)}>
      {textButton}
    </Button>
  );
  return (
    <View
      style={{
        ...newBoxStyles,
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "red",
      }}>
      <Button
        style={{ ...newButtonStyles, flex: 12 }}
        onPress={onPress}
        status={type}
        appearance={theAppearance}
        accessoryLeft={MyIcon(icon)}>
        {textButton}
      </Button>
    </View>
  );
};

export default CButton;
