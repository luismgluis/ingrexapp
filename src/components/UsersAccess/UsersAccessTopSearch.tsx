import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React, { useState } from "react";
import CButton from "../CButton/CButton";
import QRCodeScanner from "react-native-qrcode-scanner";

import { RNCamera } from "react-native-camera";
import QrCodeIcon from "../Icons/UsersAccess/QrCodeIcon";
import NumbersIcon from "../Icons/UsersAccess/NumbersIcon";
import LettersIcon from "../Icons/UsersAccess/LettersIcon";
import { useTheme } from "@ui-kitten/components";
import Panel from "../Panel/Panel";

const styles = StyleSheet.create({
  container: { flex: 1 },
  panelOptions: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    paddingVertical: 5,
  },
  panelOptionsButton: {
    flex: 1,
    height: 50,
    alignItems: "center",
  },
});
const TAG = "";
type UsersAccessTopSearchProps = {
  style?: StyleProp<ViewStyle>;
};
const UsersAccessTopSearch: React.FC<UsersAccessTopSearchProps> = (props) => {
  const theme = useTheme();
  const buttonsOptionsSize = 50;

  const [torchEnabled, setTorchEnabled] = useState(false);
  const flashMode = torchEnabled
    ? RNCamera.Constants.FlashMode.torch
    : RNCamera.Constants.FlashMode.off;

  const onSuccess = (data) => {
    console.log(TAG, data);
    //callBack(data);
  };
  /**/
  return (
    <>
      <View style={styles.container}>
        <QRCodeScanner
          onRead={onSuccess}
          flashMode={flashMode}
          topContent={<Text>Scan.</Text>}
        />
      </View>
      <Panel style={styles.panelOptions} level="7">
        <CButton
          style={styles.panelOptionsButton}
          imageInsertComponent={() => (
            <QrCodeIcon
              color={theme["color-primary-500"]}
              width={buttonsOptionsSize}
              height={buttonsOptionsSize}
            />
          )}
        />
        <CButton
          style={styles.panelOptionsButton}
          imageInsertComponent={() => (
            <NumbersIcon
              color={theme["color-primary-500"]}
              width={buttonsOptionsSize}
              height={buttonsOptionsSize}
            />
          )}
        />
        <CButton
          style={styles.panelOptionsButton}
          imageInsertComponent={() => (
            <LettersIcon
              color={theme["color-primary-500"]}
              width={buttonsOptionsSize}
              height={buttonsOptionsSize}
            />
          )}
        />
      </Panel>
    </>
  );
};
export default UsersAccessTopSearch;
