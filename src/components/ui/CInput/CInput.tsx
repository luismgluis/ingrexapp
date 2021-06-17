import React from "react";
import { Input, InputProps, useTheme } from "@ui-kitten/components";
import utils from "../../../libs/utils/utils";

const TAG = "CUSTOM INPUT";

export interface CInputPropsX extends InputProps {
  style?: any;
  captionIcon?: any;
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
  props.style = cStyles;
  return <Input {...props} />;
};
export default CInput;
