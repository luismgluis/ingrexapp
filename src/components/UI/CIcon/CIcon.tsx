import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet, View } from "react-native";
import SvgUri from "react-native-svg-uri";
import Images from "./images";

const TAG = "CUSTOM ICON";

const CustomSVG = ({ imageSource: imageSource, width, height }) => {
  console.log(TAG, imageSource);
  return (
    <SvgUri
      //fill={"#616161"}
      width={width}
      height={height}
      source={imageSource}
    />
  );
};

export interface CIconProps {
  name: string;
  width?: number;
  height?: number;
}
const CIcon = ({ name = "", width = 50, height = 50 }: CIconProps) => {
  if (!name.includes("/")) {
    name = "perfil/user";
  }
  console.log(TAG, name);
  const page = name.split("/")[0];
  const nameSource = name.split("/")[1];
  console.log(TAG, page, nameSource);
  const theUri = Images[page][nameSource].uri;
  //Images.sales.cam.uri; //Images[page][nameSource].uri;

  return (
    <View style={{ ...styles.container, width: width, height: height }}>
      <CustomSVG imageSource={theUri} width={width} height={height} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default CIcon;
