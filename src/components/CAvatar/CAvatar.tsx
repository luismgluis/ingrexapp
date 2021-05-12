import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import FastImage from "react-native-fast-image";
import { useTheme } from "@ui-kitten/components";
import DogIcon from "./../Icons/others/DogIcon";

const cicleRadius = 45;
const styles = StyleSheet.create({
  container: {
    width: cicleRadius,
    height: cicleRadius,
    borderRadius: cicleRadius,
    overflow: "hidden",
  },
  totalPanel: { justifyContent: "center" },
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
const CAvatar: React.FC<CAvatarProps> = ({
  urlImage: imageUri,
  style,
  size = 45,
}) => {
  const theme = useTheme();
  const [theImage, setTheImage] = useState(() => {
    if (imageUri !== "" && imageUri.includes("http")) {
      return imageUri;
    }
    return "";
  });
  const containerStyles = {
    ...styles.container,
    ...style,
    width: size,
    height: size,
    borderRadius: size,
    backgroudColor: theme["color-base-600"],
  };
  const imageStyles = {
    ...styles.image,
    width: size,
    height: size,
  };
  return (
    <View style={styles.totalPanel}>
      <View style={containerStyles}>
        {theImage !== "" && (
          <FastImage
            style={imageStyles}
            source={{
              uri: imageUri,
              //headers: { Authorization: "someAuthToken" },
              priority: FastImage.priority.normal,
            }}
            resizeMode={FastImage.resizeMode.cover}
            onLoad={(data) => {
              //
            }}
            onError={() => {
              console.error(TAG, "err");
              setTheImage("");
            }}
          />
        )}
        {theImage === "" && <DogIcon width={size} height={size} />}
      </View>
    </View>
  );
};
export default CAvatar;
