import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React from "react";
import DogIcon from "../../Icons/others/DogIcon";
import CImage from "../../CImage/CImage";
import utils from "../../../libs/utils/utils";
import CButton from "../../CButton/CButton";
import CameraIcon from "../../Icons/others/CameraICon";
import { useTheme } from "@ui-kitten/components";
import { InvokeGallery } from "../../Gallery/GalleryModule";
import { FeedImageType } from "../../FeedImages/FeedImages";

const imageLateralSize = 120;
const styles = StyleSheet.create({
  container: {
    width: imageLateralSize,
    height: imageLateralSize,
    borderRadius: 200,
    overflow: "hidden",
  },
  image: {
    width: imageLateralSize,
    height: imageLateralSize,
  },
  button: {},
  panelButton: {
    position: "absolute",
    backgroundColor: "green",
    borderRadius: 50,
    bottom: 0,
  },
});

const TAG = "PERFIL AVATAR";
type PerfilAvatarProps = {
  style?: StyleProp<ViewStyle>;
  imageUri?: string;
  changeButtonEnabled?: boolean;
  onSelect?: (data: FeedImageType) => void;
};
const PerfilAvatar: React.FC<PerfilAvatarProps> = ({
  style,
  imageUri = "",
  changeButtonEnabled = false,
  onSelect,
}) => {
  const theme = useTheme();

  const goGallery = InvokeGallery((data) => {
    onSelect(data);
  });
  const panelStyle = { ...utils.objects.cloneObject(style) };
  const panelButtonStyles = {
    ...styles.panelButton,
    backgroundColor: theme["background-500"],
  };

  return (
    <View style={panelStyle}>
      {imageUri === "" && (
        <View style={styles.container}>
          <DogIcon width={imageLateralSize} height={imageLateralSize} />
        </View>
      )}
      {imageUri !== "" && (
        <View style={styles.container}>
          <CImage
            withRedimension={false}
            style={styles.image}
            urlImage={imageUri}
            withPreview={true}
          />
        </View>
      )}
      {changeButtonEnabled && (
        <View style={panelButtonStyles}>
          <CButton
            style={styles.button}
            imageInsertComponent={() => (
              <CameraIcon
                color={theme["color-primary-500"]}
                width={25}
                height={25}
              />
            )}
            onPress={goGallery}
          />
        </View>
      )}
    </View>
  );
};
export default PerfilAvatar;
