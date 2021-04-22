import { StyleSheet, View, Text, StyleProp, ViewStyle } from "react-native";
import React, { useMemo, useState } from "react";
import RoomMessageType from "../../../libs/types/RoomMessageType";
import LocationICon from "../../Icons/ChatRoom/LocationIcon";
import { useTheme } from "@ui-kitten/components";
import utils from "../../../libs/utils/utils";
import api from "../../../libs/api/api";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row-reverse",
    height: "100%",
    padding: 5,
    //backgroundColor: "red",
    alignItems: "flex-end",
    borderRadius: 12,
    alignSelf: "flex-end",
  },
});

const TAG = "CHAT MESSAGE OPTIONALS";
type ChatMessageOptionalsProps = {
  style?: StyleProp<ViewStyle>;
  msj: RoomMessageType;
};
const ChatMessageOptionals: React.FC<ChatMessageOptionalsProps> = ({
  style,
  msj,
}) => {
  const theme = useTheme();
  return (
    <>
      {msj.location && (
        <View style={styles.container}>
          <LocationICon
            color={theme["color-primary-600"]}
            width={25}
            height={25}
          />
        </View>
      )}
    </>
  );
};
export default ChatMessageOptionals;
