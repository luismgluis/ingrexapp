import { Button, MenuItem, Icon, Layout, OverflowMenu, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import Utils from "./../../../libs/utils/utils";
import CSearch from "./../../UI/CSearch/CSearch";

const TAG = "SELECT PERFIL";

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

const renderToggleButton = (title, cicon = "star", action) => {
  const theIconLeft = (props1) => {
    return <Icon {...props1} name={cicon} />;
  };
  const theIconRight = (props1) => {
    return <Icon {...props1} name="chevron-down-outline" />;
  };
  return () => {
    return (
      <Button
        style={styles.buttonToggle}
        status="basic"
        appearance="ghost"
        accessoryLeft={theIconLeft}
        accessoryRight={theIconRight}
        onPress={() => action(true)}>
        {title}
      </Button>
    );
  };
};

const DropDownElements = ({ options = [] }) => {
  console.log(TAG, "renderdrop");
  const [customTitle, setcustomTitle] = useState("");
  const [customVisible, setCustomVisible] = useState(false);
  const [customIcon, setCustomIcon] = useState("star");
  const customIconLayout = (name) => {
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
    if (customTitle == "" && element.systemOption == false && element.active == true) {
      setcustomTitle(element.title);
      setCustomIcon(element.iconName)
    }

    menuItems.push(<MenuItem
      onPress={() => {
        element.onPress();
        setCustomVisible(false);
        if (element.systemOption) {
          return;
        }
        setcustomTitle(element.title);
        setCustomIcon(element.iconName);
      }}
      key={Utils.generateKey("DropOption")}
      accessoryLeft={customIconLayout(element.iconName)}
      title={element.title} />)
  }
  if (menuItems.length == 0) {
    menuItems.push(<MenuItem
      key={Utils.generateKey("DropOption")}
      accessoryLeft={customIconLayout("close-outline")}
      title="Close" />)
  }

  return (
    <OverflowMenu
      anchor={renderToggleButton(customTitle, customIcon, function () {
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
  dropOptions = [],
}) => {

  const [title, setTitle] = useState("");
  const [searchEnabled, setSearchEnabled] = useState(searchEnabledOrg);

  return (
    <Layout style={styles.container}>
      <View style={styles.panelOne}>
        <DropDownElements
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
