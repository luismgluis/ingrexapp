import { StyleSheet } from "react-native";
import React from "react";
import { Input, InputProps, useTheme } from "@ui-kitten/components";
import utils from "../../libs/utils/utils";

const styles = StyleSheet.create({ container: { backgroundColor: "red" } });

const TAG = "CUSTOM INPUT";

export interface CInputPropsX extends InputProps {
  style?;
  paddingVertical?: number;
  paddingHorizontal?: number;
}
const CInput: React.FC<CInputPropsX> = (props) => {
  const { paddingVertical = 0, paddingHorizontal = 0 } = props;
  const theme = useTheme();
  const cStyles = {
    ...utils.objects.cloneObject(props.style),
    backgroundColor: theme["background-500"],
    paddingVertical: paddingVertical,
    paddingHorizontal: paddingHorizontal,
  };
  return <Input {...props} style={cStyles} />;
};
export default CInput;
