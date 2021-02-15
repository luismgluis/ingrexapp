import { Button, MenuItem, Icon, Layout, OverflowMenu, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Utils from "./../../../libs/utils/utils";
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

const DropDownElements = ({ title, options = [] }) => {
  console.log("renderdrop");
  const [customTitle, setcustomTitle] = useState(title);
  const [customVisible, setCustomVisible] = useState(false);
  const customIcon = (name) => {
    return (props) => {
      return (<Icon {...props} name={name} />)
    };
  }
  let menuItems = [];
  for (const key in options) {
    if (!Object.hasOwnProperty.call(options, key)) {
      continue;
    }
    const element = options[key];
    menuItems.push(<MenuItem
      onPress={() => {
        setCustomVisible(false);
        setcustomTitle(element.title);
        element.onPress();
      }}
      key={Utils.generateKey("DropOption")}
      accessoryLeft={customIcon(element.iconName)}
      title={element.title} />)
  }
  if (menuItems.length == 0) {
    menuItems.push(<MenuItem
      key={Utils.generateKey("DropOption")}
      accessoryLeft={customIcon("close-outline")}
      title="Close" />)
  }
  return (
    <OverflowMenu
      anchor={renderToggleButton(customTitle, function () {
        setCustomVisible(true);
      })}
      visible={customVisible}
      onBackdropPress={() => setCustomVisible(false)}>
      {menuItems}
    </OverflowMenu>
  )
};

const SelectPerfil = ({
  searchEnabledOrg = false,
  dropTitle = "",
  dropOptions = [],
}) => {

  const [title, setTitle] = useState(dropTitle);
  const [searchEnabled, setSearchEnabled] = useState(searchEnabledOrg);

  return (
    <Layout style={styles.container}>
      <View style={styles.panelOne}>
        <DropDownElements
          title={title}
          options={dropOptions}
        />
      </View>
      <Layout style={styles.panelTwo}>
        {renderOptionButton("more-vertical", () => {
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
