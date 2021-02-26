import {
  Avatar,
  Button,
  Divider,
  Input,
  Layout,
  Text,
} from "@ui-kitten/components";
import React, { useState } from "react";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import CButton from "../CButton/CButton";
import CIcon from "../CIcon/CIcon";
import api from "../../../libs/api/api";
import { FeedImageType } from "../FeedImages/FeedImages";
import { Product } from "../../../libs/api/interfaces";
const TAG = "PRODUCT CAR ADD";

interface InputCountProps {
  style?: StyleProp<ViewStyle>;
}
const InputCount = ({ style = {} }: InputCountProps) => {
  const [counter, setCounter] = useState(1);
  const updateCounter = (negative = false) => {
    if (negative) {
      if (counter <= 1) {
        return;
      }
      setCounter(counter - 1);
      return;
    }
    setCounter(counter + 1);
  };
  return (
    <View style={style}>
      <Input
        value={`${counter}`}
        accessoryLeft={(props) => (
          <CButton
            size="small"
            onPress={() => {
              updateCounter(true);
            }}
            icon="minus"
          />
        )}
        accessoryRight={(props) => (
          <CButton
            size="small"
            onPress={() => {
              updateCounter();
            }}
            icon="plus"
          />
        )}
      />
    </View>
  );
};

interface ProductCarAddProps {
  prodInfo: Product;
}
const ProductCarAdd = ({ prodInfo }: ProductCarAddProps) => {
  console.log(TAG, prodInfo);
  const getPerfilImage = () => {
    return (
      <CIcon
        name={"perfil/user"}
        width={styles.avatar.width}
        height={styles.avatar.height}
      />
    );
  };
  const primaryBtnClick = () => {};
  return (
    <Layout style={styles.container} level="3">
      <View style={styles.containerTop}>
        <View style={styles.closeButton}>
          <CButton size="large" icon="close" onlyIcon={true} />
        </View>
        <View style={styles.topPanelTop}>{getPerfilImage()}</View>
        <View style={styles.topPanelBottom}>
          <Text category="h5">{prodInfo.name}</Text>
          <Text category="s2">{prodInfo.description}</Text>
          <Divider />
          <Text style={styles.description} category="s1">
            {prodInfo.description}
          </Text>
        </View>
      </View>
      <View style={styles.containerBottom}>
        <View style={styles.containerBottomLeft}>
          <InputCount />
        </View>
        <View style={styles.containerBottomRight}>
          <CButton type="primary" icon="corner-up-right-outline" />
        </View>
      </View>
    </Layout>
  );
};

export default ProductCarAdd;

const styles = StyleSheet.create({
  container: {
    flex: 12,
  },
  containerTop: {
    flex: 12,
    justifyContent: "flex-start",
  },
  topPanelTop: {
    width: "100%",
    padding: 10,
    alignSelf: "center",
    justifyContent: "center",
    alignItems: "center",
    height: 100,
  },
  topPanelBottom: {
    height: 80,
    width: "80%",
    alignSelf: "center",
    paddingRight: 10,
  },
  containerBottomLeft: {
    width: "80%",
  },
  containerBottomRight: {
    paddingTop: 2,
    width: "20%",
  },
  closeButton: {
    width: 30,
    height: 30,
    position: "absolute",
    top: 0,
    right: 20,
  },
  avatar: {
    width: 80,
    height: 80,
  },
  description: {
    marginTop: 10,
  },
  containerBottom: {
    flexDirection: "row",
    width: "100%",
    height: 50,
  },
});
