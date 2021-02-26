import React from "react";
import { Animated, Pressable, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import CIcon from "../CIcon/CIcon";

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

interface ImageButtonProps {
  name: string;
  onPress?: () => void;
  width?: number;
  height?: number;
}
const ImageButton = ({
  name = "",
  width = 50,
  height = 50,
  onPress = () => {},
}: ImageButtonProps) => {
  const w = width || 50;
  const h = height || 50;
  /*<Pressable style={{ width: w, height: h }} onPress={onPress}>
          <CIcon name={name} width={w} height={h} />
        </Pressable> */
  return (
    <Animated.View>
      <View style={{ borderRadius: 4 /*, backgroundColor: "red" */ }}>
        <AnimatedTouchable style={{ width: w, height: h }} onPress={onPress}>
          <CIcon name={name} width={w} height={h} />
        </AnimatedTouchable>
      </View>
    </Animated.View>
  );
};

export default ImageButton;
