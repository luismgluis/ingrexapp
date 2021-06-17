import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { useTheme } from "@ui-kitten/components";
import styles from "./ChatMessageStyles";
import api from "../../../../libs/api/api";
import RoomMessageType from "../../../../libs/types/RoomMessageType";

const TAG = "CHAT MESSAGE TITLE";
type ChatMessageTitleProps = {
  msj: RoomMessageType;
  text: string;
};
const ChatMessageTitle: React.FC<ChatMessageTitleProps> = ({ msj, text }) => {
  const theme = useTheme();
  const titleStyles = {
    ...styles.titleStyles,
    color: theme["text-alternate-color"],
  };
  const isme: boolean = msj.creator === api.users.currentUser.id;
  let textStyles = { ...styles.textStyles };

  if (isme) {
    textStyles = {
      ...textStyles,
      color: theme["text-basic-color"],
    };
    titleStyles.color = theme["color-info-200"];
  }
  return <>{text !== "" && <Text style={titleStyles}>{text}</Text>}</>;
};
export default ChatMessageTitle;
