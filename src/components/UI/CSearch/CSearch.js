import { Button, Icon, Input } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { Text } from "react-native-svg";

const renderIconButton = (icon, actionFn) => {
  const theIconLeft = (props) => {
    return <Icon {...props} name={icon} />;
  };
  return () => (
    <Button
      style={styles.buttonToggle}
      status="basic"
      appearance="ghost"
      accessoryRight={theIconLeft}
      onPress={() => actionFn()}
    />
  );
};
const renderIcon = (action) => {
  return (props) => (
    <TouchableWithoutFeedback onPress={action}>
      <Icon {...props} name={"close-outline"} />
    </TouchableWithoutFeedback>
  );
};

const CSearch = () => {
  const [inputEnabled, setInputEnabled] = useState(false);
  const [inputText, setInputText] = useState("");
  const toggleInputEnabled = () => {
    setInputEnabled(!inputEnabled);
  }; //
  const LayoutInputEnabled = (
    <Input
      style={styles.input}
      value={inputText}
      placeholder="Search"
      accessoryRight={renderIcon(toggleInputEnabled)}
      onChangeText={(nextValue) => setInputText(nextValue)}
    />
  );
  const LayoutInputDisabled = renderIconButton("search-outline", () => {
    setInputEnabled(true);
  });
  /*{inputEnabled && <LayoutInputEnabled />}
      {!inputEnabled && <LayoutInputDisabled />} */
  return (
    <View style={styles.container}>
      {inputEnabled && LayoutInputEnabled}
      {!inputEnabled && <LayoutInputDisabled />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 12 },
  inputContainer: { flexDirection: "row" },
  inputPanel1: { flex: 12 },
  inputPanel2: {
    alignItems: "center",
    justifyContent: "center",
  },
});
export default CSearch;
