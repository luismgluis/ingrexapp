import { StyleSheet, View, Text, ViewProps } from "react-native";
import React from "react";
import CButton from "../../../ui/CButton/CButton";
import ClipIcon from "../../../Icons/ChatRoom/ClipIcon";
import { useTheme } from "@ui-kitten/components";

const styles = StyleSheet.create({ container: {} });

const TAG = "BUTTON CLIP";
export interface CRBBButtonClipProps extends ViewProps {
  cstyles: any;
  onPress: () => void;
}
const CRBBButtonClip: React.FC<CRBBButtonClipProps> = ({
  cstyles,
  onPress,
}) => {
  const theme = useTheme();
  return (
    <View style={cstyles}>
      <CButton
        imageInsertComponent={() => (
          <ClipIcon color={theme["color-primary-500"]} width={25} height={25} />
        )}
        onPress={onPress}
      />
    </View>
  );
};
export default CRBBButtonClip;
