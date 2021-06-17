import {
  StyleSheet,
  View,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import React from "react";
import { Button, ButtonProps } from "@ui-kitten/components";
import utils from "../../../libs/utils/utils";

const styles = StyleSheet.create({
  button: { borderRadius: 12 },
  imageButton: {
    width: 40,
    height: 40,
    justifyContent: "center", //Centered vertically
    alignItems: "center", // Centered horizontally
    flex: 1,
  },
});

const TAG = "CUSTOM BUTTON";
interface CButtonProps extends ButtonProps {
  text?: string;
  appeareance?: "outline" | "ghost";
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  imageInsertComponent?: React.FC<any>;
  paddingVertical?: number;
  paddingHorizontal?: number;
}
const CButton: React.FC<CButtonProps> = ({
  text,
  onPress,
  style,
  appeareance = "outline",
  imageInsertComponent,
  paddingVertical = 0,
  paddingHorizontal = 0,
  status,
}) => {
  const boxStyles = (() => {
    if (imageInsertComponent) {
      return {
        ...utils.objects.cloneObject(style),
        flex: 1,
        paddingVertical: paddingVertical,
        paddingHorizontal: paddingHorizontal,
      };
    }
    return {
      ...utils.objects.cloneObject(style),
      paddingVertical: paddingVertical,
      paddingHorizontal: paddingHorizontal,
    };
  })();
  return (
    <>
      {!imageInsertComponent && (
        <View style={boxStyles}>
          <Button
            status={status}
            onPress={onPress}
            style={styles.button}
            appearance={appeareance}>
            {text}
          </Button>
        </View>
      )}
      {imageInsertComponent && (
        <View style={boxStyles}>
          <View style={styles.imageButton}>
            <Pressable style={styles.imageButton} onPress={onPress}>
              {imageInsertComponent}
            </Pressable>
          </View>
        </View>
      )}
    </>
  );
};
export default CButton;
