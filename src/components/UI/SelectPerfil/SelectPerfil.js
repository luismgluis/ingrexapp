import { Button, Icon, Layout, Popover, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { set } from "react-native-reanimated";
import CSearch from "./../../UI/CSearch/CSearch";

const renderOptionButton = (icon, actionFn) => {
  const theIconLeft = (props1) => {
    return <Icon {...props1} name={icon} />;
  };
  return (
    <Button
      style={styles.buttonToggle}
      status="basic"
      appearance="ghost"
      accessoryRight={theIconLeft}
      onPress={() => actionFn()}
    />
  );
};

const renderToggleButton = (title, action) => {
  const theIconLeft = (props1) => {
    return <Icon {...props1} name="chevron-down-outline" />;
  };
  return () => {
    return (
      <Button
        style={styles.buttonToggle}
        status="basic"
        appearance="ghost"
        accessoryRight={theIconLeft}
        onPress={() => action(true)}>
        {title}
      </Button>
    );
  };
};

const DropDownElements = ({ title, visible, setVisible }) => {
  console.log("renderdrop");
  return (
    <Popover
      anchor={renderToggleButton(title, function () {
        setVisible(true);
      })}
      visible={visible}
      placement="bottom"
      onBackdropPress={() => setVisible(false)}>
      <Layout style={styles.content}>
        <Icon style={styles.icon} fill="#8F9BB3" name="star" />
        <Text>Welcome to UI Kitten 😻</Text>
      </Layout>
    </Popover>
  );
};

const SelectPerfil = ({ searchEnabledOrg }) => {
  const [visible, setVisible] = useState(false);
  const [title, setTitle] = useState("Titulo");
  const [searchEnabled, setSearchEnabled] = useState(true);
  if (typeof searchEnabledOrg !== "undefined") {
    setSearchEnabled(searchEnabledOrg);
  }

  return (
    <Layout style={styles.container}>
      <View style={styles.panelOne}>
        <DropDownElements
          title={title}
          visible={visible}
          setVisible={setVisible}
        />
      </View>
      <Layout style={styles.panelTwo}>
        {renderOptionButton("star", () => {
          setTitle("EMPRESA X");
        })}
        {searchEnabled && <CSearch />}
      </Layout>
    </Layout>
  ); //
};
const styles = StyleSheet.create({
  container: {
    flex: 12,
    flexDirection: "row",
    maxHeight: 50,
  },
  select: {
    flex: 10,
    //height:60
    fontSize: 20,
    borderRadius: 0,
    elevation: 0,
    //borderColor: "black"
  },
  icon: {
    width: 32,
    height: 32,
  },
  panelOne: {
    flex: 6,
    alignSelf: "stretch",
    alignItems: "flex-start",
  },
  panelTwo: {
    flex: 6,
    flexDirection: "row-reverse",
    alignSelf: "stretch",
    alignItems: "flex-end",
  },
  buttonToggle: {},
  buttonsOptions: {},
  conten: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 4,
    paddingVertical: 8,
  },
});
export default SelectPerfil;
