import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import FastImage from "react-native-fast-image";
import { useTheme } from "@ui-kitten/components";

const cicleRadius = 45;
const styles = StyleSheet.create({
  container: {
    width: cicleRadius,
    height: cicleRadius,
    borderRadius: cicleRadius,
    overflow: "hidden",
  },
  image: {
    width: cicleRadius,
    height: cicleRadius,
  },
});

const TAG = "CUSTOM AVATAR";
type CAvatarProps = {
  urlImage: string;
  style?: any;
  size?: number;
};
const CAvatar: React.FC<CAvatarProps> = ({ urlImage, style, size = 45 }) => {
  const theme = useTheme();
  const containerStyles = {
    ...styles.container,
    ...style,
    width: size,
    height: size,
    borderRadius: size,
  };
  const imageStyles = {
    ...styles.image,
    width: size,
    height: size,
  };
  return (
    <View style={containerStyles}>
      <FastImage
        style={imageStyles}
        source={{
          uri: urlImage,
          //headers: { Authorization: "someAuthToken" },
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
        onLoad={(data) => {
          //
        }}
        onError={() => {
          console.error(TAG, "err");
        }}
      />
    </View>
  );
};
export default CAvatar;
