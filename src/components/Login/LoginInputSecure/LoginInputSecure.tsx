import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React, { useState } from "react";
import { Icon, Input } from "@ui-kitten/components";
import { TouchableWithoutFeedback } from "@ui-kitten/components/devsupport";
import CInput from "../../CInput/CInput";

const styles = StyleSheet.create({ container: {} });

const TAG = "LOGIN INPUT SECURE";
type LoginInputSecureProps = {
  style?: StyleProp<ViewStyle>;
  label: string;
  placeholder: string;
  caption?: string;
  password;
  setPassword;
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
  const alertIcon = (props1) => (
    <Icon {...props1} name="alert-circle-outline" />
  );
  const renderIcon = (props1) => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props1} name={secureTextEntry ? "eye-off" : "eye"} />
    </TouchableWithoutFeedback>
  );
  return (
    <CInput
      style={style}
      value={password}
      label={label}
      placeholder={placeholder}
      caption={caption}
      accessoryRight={renderIcon}
      captionIcon={alertIcon}
      secureTextEntry={secureTextEntry}
      onChangeText={(nextValue) => setPassword(nextValue)}
    />
  );
};
export default LoginInputSecure;
