import { StyleSheet, View, Text, ViewProps } from "react-native";
import React from "react";
import { useTheme } from "@ui-kitten/components";
import CButton from "../../../ui/CButton/CButton";
import MediaIcon from "../../../Icons/ChatRoom/MediaIcon";

const styles = StyleSheet.create({ container: {} });

const TAG = "CRBBB BUTTON MEDIA";
export interface CRBBButtonMediaProps extends ViewProps {
  cstyles: any;
  onPress: () => void;
}
const CRBBButtonMedia: React.FC<CRBBButtonMediaProps> = ({
  cstyles,
  onPress,
}) => {
  const theme = useTheme();
  return (
    <View style={cstyles}>
      <CButton
        imageInsertComponent={() => (
          <MediaIcon
            color={theme["color-primary-500"]}
            width={25}
            height={25}
          />
        )}
        onPress={onPress}
      />
    </View>
  );
};
export default CRBBButtonMedia;
