import { Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { Product } from "../../../libs/api/interfaces";
import Gondolas from "../../UI/Gondolas/Gondolas";
import ProductCarAdd from "../../UI/ProductCarAdd/ProductCarAdd";
import SalesButtonsOptions from "./SalesButtonsOptions";
import SalesCarList from "./SalesCarList";
import SalesCustomQRScanner from "./SalesCustomQRScanner";
import SalesRecents from "./SalesRecents";

const TAG = "SALES SCREEN";
const win = Dimensions.get("window");

const SalesScreen = () => {
  const tess = new Product();
  tess.create("ss", "Pepe", "Un pepesoso");
  const [productLooking, setProductLooking] = useState(tess);
  const [productPreviewVisible, setProductPreviewVisible] = useState(true);
  const [optionsBVisible, setOptionsBVisible] = useState(false);
  const [inputSearchType, setInputSearchType] = useState("NAME"); //QR,NAME,CODE
  return (
    <Layout style={styles.panelFather}>
      <Layout style={styles.panelTop}>
        <Layout style={styles.panelTLeft}>
          {productPreviewVisible && <ProductCarAdd prodInfo={productLooking} />}
          {!productPreviewVisible && <SalesRecents />}
        </Layout>
        <Layout style={styles.panelTRight}>
          <SalesCarList />
        </Layout>
      </Layout>
      <Layout style={styles.panelBottom}>
        <Layout style={styles.panelBLeft}>
          <SalesButtonsOptions
            callBack={(data) => {
              setInputSearchType(data);
            }}
          />
        </Layout>
        <Layout style={styles.panelBRight}>
          {inputSearchType == "QR" && <SalesCustomQRScanner />}
          {inputSearchType == "NAME" && <Gondolas />}
          {inputSearchType == "CODE" && <Text>code</Text>}
        </Layout>
      </Layout>
      {optionsBVisible && <Layout style={styles.panelOptions}></Layout>}
    </Layout>
  );
};

const middleScreen = (win.height - 50) / 2;
const styles = StyleSheet.create({
  panelFather: {
    flex: 12,
    flexDirection: "column",
  },
  panelTop: {
    flex: 7,
    width: "100%",
    flexDirection: "row",
    height: middleScreen,
  },
  panelTRight: {
    width: "50%",
  },
  panelTLeft: {
    width: "50%",
  },
  panelBottom: {
    flex: 6,
    width: "100%",
    overflow: "hidden",
    flexDirection: "row",
    height: middleScreen,
    padding: 5,
  },
  panelBRight: {
    overflow: "hidden",
    flex: 12,
    width: "70%",
    borderRadius: 4,
  },
  panelBLeft: {
    width: "30%",
  },
  panelOptions: {
    flex: 12,
    flexDirection: "row",
    maxHeight: 60,
  },
});
export default SalesScreen;
