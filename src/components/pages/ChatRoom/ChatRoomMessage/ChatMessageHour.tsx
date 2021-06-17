import { StyleSheet, Text, StyleProp, ViewStyle } from "react-native";
import React, { useMemo } from "react";
import RoomMessageType from "../../../../libs/types/RoomMessageType";
import api from "../../../../libs/api/api";
import { useTheme } from "@ui-kitten/components";
import utils from "../../../../libs/utils/utils";

const styles = StyleSheet.create({ text: {} });

const TAG = "CHAT MESSAGE HOUR";
type ChatMessageHourProps = {
  style?: StyleProp<ViewStyle>;
  msj: RoomMessageType;
};
const ChatMessageHour: React.FC<ChatMessageHourProps> = ({ style, msj }) => {
  const hourText = useMemo(() => {
    const strDate = utils.dates.unixToString(msj.creationDate!, true);
    return strDate.split(" ")[1];
  }, [msj]);
  const theme = useTheme();
  const textStyles = useMemo(() => {
    const isme: boolean = msj.creator === api.users.currentUser.id;
    return {
      color: isme ? theme["color-basic-100"] : theme["color-primary-200"],
      fontSize: 12,
    };
  }, [msj, theme]);
  return <Text style={textStyles}>{hourText}</Text>;
};
export default ChatMessageHour;
