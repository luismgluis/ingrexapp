import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React, { useState } from "react";
import CButton from "../CButton/CButton";
import QRCodeScanner from "react-native-qrcode-scanner";

import { RNCamera } from "react-native-camera";
import QrCodeIcon from "../Icons/UsersAccess/QrCodeIcon";
import NumbersIcon from "../Icons/UsersAccess/NumbersIcon";

import { useTheme } from "@ui-kitten/components";
import Panel from "../Panel/Panel";

import UserAccessSearch from "./UserAccessSearch/UserAccessSearch";
import { ResidentType } from "../../libs/types/ResidentType";
import HomeSearchIcon from "../Icons/UsersAccess/HomeSearchIcon";
import IdCardIcon from "../Icons/UsersAccess/IdCardIcon";

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
const ButtonOption = ({ onPress, selected = false, iconComponent }) => {
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
      imageInsertComponent={() => iconComponent}
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
  const flashMode = torchEnabled
    ? RNCamera.Constants.FlashMode.torch
    : RNCamera.Constants.FlashMode.off;

  const [searchSelected, setSearchSelected] = useState("idCard");

  const onSuccess = (data: ResidentType) => {
    console.log(TAG, data);
    onResult(data);
    //callBack(data);
  };
  const onQRRead = (data) => {
    console.log(TAG, data);
  };
  return (
    <>
      <View style={styles.container}>
        {searchSelected === "" ||
          (searchSelected === "qr" && (
            <QRCodeScanner
              onRead={(e) => onQRRead(e.data)}
              flashMode={flashMode}
              topContent={<Text>Scan.</Text>}
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
