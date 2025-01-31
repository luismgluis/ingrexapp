import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React, { useState } from "react";
import CButton from "../CButton/CButton";

import QrCodeIcon from "../../Icons/UsersAccess/QrCodeIcon";

import { useTheme } from "@ui-kitten/components";
import Panel from "../Panel/Panel";

import UserAccessSearch from "./UserAccessSearch/UserAccessSearch";
import { ResidentType } from "../../../libs/types/ResidentType";
import HomeSearchIcon from "../../Icons/UsersAccess/HomeSearchIcon";
import IdCardIcon from "../../Icons/UsersAccess/IdCardIcon";
import QRScanner from "../QRScanner/QRScanner";

const styles = StyleSheet.create({
  container: { flex: 1 },
  panelOptions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    paddingTop: 10,
  },
  panelOptionsButton: {
    flex: 1,
    height: 50,
    alignItems: "center",
    borderBottomWidth: 2,
    borderBottomColor: "white",
    paddingBottom: 10,
  },
});
const TAG = "USERS ACCESS TOP SEARCH";
type ButtonOptionType = {
  onPress: () => void;
  selected: boolean;
  iconComponent: any;
};
const ButtonOption: React.FC<ButtonOptionType> = ({
  onPress,
  selected,
  iconComponent,
}) => {
  const theme = useTheme();
  const buttonStyles = {
    ...styles.panelOptionsButton,
    borderBottomColor: theme["color-primary-600"],
    borderBottomWidth: selected ? 3 : 0,
  };
  return (
    <CButton
      onPress={onPress}
      style={buttonStyles}
      imageInsertComponent={iconComponent}
    />
  );
};
type UsersAccessTopSearchProps = {
  style?: StyleProp<ViewStyle>;
  onResult: (u: ResidentType) => void;
};

const UsersAccessTopSearch: React.FC<UsersAccessTopSearchProps> = ({
  style,
  onResult,
}) => {
  const theme = useTheme();
  const buttonsOptionsSize = 50;

  const [torchEnabled, setTorchEnabled] = useState(false);

  const [searchSelected, setSearchSelected] = useState("idCard");

  const onSuccess = (data: ResidentType) => {
    console.log(TAG, data);
    onResult(data);
    //callBack(data);
  };
  const onQRRead = (data: any) => {
    console.log(TAG, data);
  };
  return (
    <>
      <View style={styles.container}>
        {searchSelected === "" ||
          (searchSelected === "qr" && (
            <QRScanner
              onRead={(text) => onQRRead(text)}
              torchEnabled={torchEnabled}
            />
          ))}
        {searchSelected === "idCard" && (
          <UserAccessSearch onResult={onSuccess} inputType="idCard" />
        )}
        {searchSelected === "sector" && (
          <UserAccessSearch onResult={onSuccess} inputType="sector" />
        )}
      </View>
      <Panel style={styles.panelOptions} level="7">
        <ButtonOption
          selected={searchSelected === "qr"}
          iconComponent={
            <QrCodeIcon
              color={theme["color-primary-500"]}
              width={buttonsOptionsSize}
              height={buttonsOptionsSize}
            />
          }
          onPress={() => setSearchSelected("qr")}
        />
        <ButtonOption
          selected={searchSelected === "idCard"}
          iconComponent={
            <IdCardIcon
              color={theme["color-primary-500"]}
              width={buttonsOptionsSize}
              height={buttonsOptionsSize}
            />
          }
          onPress={() => setSearchSelected("idCard")}
        />
        <ButtonOption
          selected={searchSelected === "sector"}
          iconComponent={
            <HomeSearchIcon
              color={theme["color-primary-500"]}
              width={buttonsOptionsSize}
              height={buttonsOptionsSize}
            />
          }
          onPress={() => setSearchSelected("sector")}
        />
      </Panel>
    </>
  );
};
export default UsersAccessTopSearch;
