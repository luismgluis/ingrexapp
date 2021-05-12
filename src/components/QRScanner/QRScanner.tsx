import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React from "react";

const styles = StyleSheet.create({ container: {} });

const TAG = "QR SCANNER";
type QRScannerProps = {
  style?: StyleProp<ViewStyle>;
};
const QRScanner: React.FC<QRScannerProps> = ({ style }) => {
  return (
    <View style={style}>
      <Text>Hello from QRScanner</Text>
    </View>
  );
};
export default QRScanner;
