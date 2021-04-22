import React from "react";
import {
  Text,
  Icon,
  MenuItem,
  OverflowMenu,
  TopNavigationAction,
  TopNavigation,
} from "@ui-kitten/components";
import { StyleSheet, View } from "react-native";
import { useTheme } from "@react-navigation/native";
import Panel from "../Panel/Panel";

const styles = StyleSheet.create({ container: { width: "100%" } });

const BackIcon = (props) => <Icon {...props} name="arrow-back" />;

const EditIcon = (props) => <Icon {...props} name="edit" />;

const MenuIcon = (props) => <Icon {...props} name="more-vertical" />;

const InfoIcon = (props) => <Icon {...props} name="info" />;

const LogoutIcon = (props) => <Icon {...props} name="log-out" />;

//----------------------------------------------------------------------
type CTopBackProps = {
  title: string;
  subtitle?: string;
  onBackPress: () => void;
};
const CTopBack: React.FC<CTopBackProps> = ({
  title = "",
  subtitle = "",
  onBackPress,
}) => {
  const [menuVisible, setMenuVisible] = React.useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const renderMenuAction = () => (
    <TopNavigationAction icon={MenuIcon} onPress={toggleMenu} />
  );

  const renderRightActions = () => (
    <React.Fragment>
      <TopNavigationAction icon={EditIcon} />
      <OverflowMenu
        anchor={renderMenuAction}
        visible={menuVisible}
        onBackdropPress={toggleMenu}>
        <MenuItem accessoryLeft={InfoIcon} title="About" />
        <MenuItem accessoryLeft={LogoutIcon} title="Logout" />
      </OverflowMenu>
    </React.Fragment>
  );

  const renderBackAction = () => (
    <TopNavigationAction onPress={onBackPress} icon={BackIcon} />
  );
  const topProps = {
    alignment: "center",
    title: undefined,
    subtitle: undefined,
    accessoryLeft: renderBackAction,
    accessoryRight: renderRightActions,
  };
  if (subtitle !== "") {
    topProps.title = title;
    topProps.subtitle = subtitle;
  } else {
    topProps.title = (props) => (
      <Text {...props} style={{ fontSize: 22 }}>
        {title}
      </Text>
    );
  }
  const topNavStyles = { backgroundColor: "transparent" };
  /*
        accessoryRight={topProps.accessoryRight} */
  return (
    <Panel style={styles.container} level="6">
      <TopNavigation
        style={topNavStyles}
        title={topProps.title}
        subtitle={topProps.subtitle}
        accessoryLeft={topProps.accessoryLeft}
      />
    </Panel>
  );
};

export default CTopBack;
