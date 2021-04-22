import React, { useMemo } from "react";
import RoomMessageType from "../../../libs/types/RoomMessageType";
import styles from "./ChatMessageStyles";
import { Text, useTheme } from "@ui-kitten/components";
import api from "../../../libs/api/api";
import ChatMessageHour from "./ChatMessageHour";
import { Dimensions, StyleSheet, View } from "react-native";
const stylesTwo = StyleSheet.create({
  container: {
    paddingBottom: 10,
    paddingRight: 0,
    maxWidth: 200,
  },
  panelHourText: {
    position: "absolute",
    bottom: -4,
    right: 10,
  },
});
const TAG = "CHAT MESSAGE TEXT";
type ChatMessageTextProps = {
  msj: RoomMessageType;
};
const ChatMessageText: React.FC<ChatMessageTextProps> = ({ msj }) => {
  const theme = useTheme();
  const titleStyles = {
    ...styles.titleStyles,
    color: theme["background-100"],
  };
  const isme: boolean = msj.creator === api.users.currentUser.id;
  let textStyles = { ...styles.textStyles };

  if (isme) {
    textStyles = {
      ...textStyles,
      color: theme["color-primary-800"],
    };
    titleStyles.color = theme["background-100"];
  } else {
    textStyles = {
      ...textStyles,
      color: theme["text-alternate-color"],
    };
  }

  const containerStyles = useMemo(() => {
    if (msj.text.length * 5 < Dimensions.get("screen").width * 0.8) {
      return {
        ...stylesTwo.container,
        maxWidth: Dimensions.get("screen").width * 0.8,
        paddingRight: 30,
        paddingBottom: 3,
      };
    }
    return {
      ...stylesTwo.container,
      maxWidth: Dimensions.get("screen").width * 0.8,
    };
  }, [msj]);

  return (
    <View style={containerStyles}>
      {msj.type === "text" && (
        <Text style={textStyles} category="h5">
          {msj.text}
        </Text>
      )}
      <View style={stylesTwo.panelHourText}>
        <ChatMessageHour msj={msj} />
      </View>
    </View>
  );
};
export default ChatMessageText;
