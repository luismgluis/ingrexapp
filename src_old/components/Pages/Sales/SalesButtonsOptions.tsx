import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import CButton from "../../UI/CButton/CButton";
import CIcon from "../../UI/CIcon/CIcon";
import ImageButton from "../../UI/ImageButton/ImageButton";
const TAG = "SALES BUTTONS OPTIONS";
const win = Dimensions.get("window");

const getLateralWidth = (): number => {
  const initial = (win.height / 2 - 160) / 3;
  const initialInMaxWidth = win.width * 0.3;
  console.log(TAG, initial, initialInMaxWidth);
  if (initial > initialInMaxWidth) {
    return initialInMaxWidth;
  }
  return initial;
};
interface SalesButtonsOptionsProps {
  callBack: (data: string) => void;
}
const SalesButtonsOptions = ({ callBack }: SalesButtonsOptionsProps) => {
  const w = getLateralWidth(); //80;
  return (
    <Layout level="2" style={styles.container}>
      <View style={styles.boxButton}>
        <ImageButton
          width={w}
          height={w}
          onPress={() => {
            callBack("QR");
          }}
          name="sales/qrcode"
          //textButton="QR" sales/qrcode
        />
      </View>
      <View style={styles.boxButton}>
        <ImageButton
          width={w}
          height={w}
          onPress={() => {
            callBack("NAME");
          }}
          name="sales/letters"
        />
      </View>
      <View style={styles.boxButton}>
        <ImageButton
          width={w}
          height={w}
          onPress={() => {
            callBack("CODE");
          }}
          name="sales/numbers"
        />
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 12,
    alignItems: "center",
    justifyContent: "center",
    borderRightColor: "#EEEEEE",
    borderRightWidth: 2,
  },
  boxButton: {
    alignItems: "center",
    width: "100%",
    marginBottom: 20,
  },
});
export default SalesButtonsOptions;
