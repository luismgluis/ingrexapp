import { Button, Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";

import QRCodeScanner from "react-native-qrcode-scanner";
import { RNCamera } from "react-native-camera";
import { StyleSheet, View } from "react-native";
import CButton from "../CButton/CButton";

const TAG = "QRscanner";
interface QRscannerProps {
  callBack: (data: string) => void;
}
const QRscanner = ({ callBack }: QRscannerProps) => {
  const [torchEnabled, setTorchEnabled] = useState(false);
  const flashMode = torchEnabled
    ? RNCamera.Constants.FlashMode.torch
    : RNCamera.Constants.FlashMode.off;
  const flashButtonType = torchEnabled ? "warning" : "basic";
  const onSuccess = (data) => {
    console.log(TAG, data);
    //callBack(data);
  };
  return (
    <Layout style={styles.container}>
      <Text>Load Camera</Text>
      <QRCodeScanner onRead={onSuccess} flashMode={flashMode} />
      <View style={styles.bottomContent}>
        <CButton
          onPress={() => {
            setTorchEnabled(!torchEnabled);
          }}
          onlyIcon={true}
          type={flashButtonType}
          icon="flash"
        />
      </View>
    </Layout>
  );
};
export default QRscanner;

const styles = StyleSheet.create({
  container: {
    flex: 12,
  },
  bottomContent: {
    position: "absolute",
    bottom: 10,
  },
});
