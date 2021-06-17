import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import React, { useState } from "react";
import { Icon } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";

import utils from "../../../../libs/utils/utils";
import CInput from "../../../ui/CInput/CInput";

const TAG = "LOGIN INPUT SECURE";

type LoginInputSecureProps = {
  style?: StyleProp<ViewStyle>;
  label: string;
  placeholder: string;
  caption?: string;
  password: string;
  setPassword: (val: any) => void;
};
const LoginInputSecure: React.FC<LoginInputSecureProps> = ({
  style,
  label = "",
  placeholder = "",
  caption = "",
  password,
  setPassword,
}) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureEntry = () => {
    if (secureTextEntry) {
      setSecureTextEntry(false);
      return;
    }
    setSecureTextEntry(true);
  };
  const alertIcon = (props1: any) => (
    <Icon {...props1} name="alert-circle-outline" />
  );
  const renderIcon = (props1: any) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props1} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );
  const inputStyles = {
    ...utils.objects.cloneObject(style),
    height: 70,
  };
  return (
    <CInput
      style={inputStyles}
      value={password}
      label={label}
      placeholder={placeholder}
      caption={caption}
      accessoryRight={renderIcon}
      captionIcon={alertIcon}
      paddingVertical={10}
      secureTextEntry={secureTextEntry}
      onChangeText={(nextValue) => setPassword(nextValue)}
    />
  );
};
export default LoginInputSecure;
