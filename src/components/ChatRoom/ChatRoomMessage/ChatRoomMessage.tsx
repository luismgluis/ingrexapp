import { View } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import RoomMessageType from "../../../libs/types/RoomMessageType";
import { useTheme } from "@ui-kitten/components";

import ChatRoomModule from "../ChatRoomModule";
import api from "../../../libs/api/api";
import styles from "./ChatMessageStyles";
import ChatMessageAvatar from "./ChatMessageAvatar";
import ChatMessageText from "./ChatMessageText";
import ChatMessageTitle from "./ChatMessageTitle";
import utils from "../../../libs/utils/utils";
import ChatMessageImage from "./ChatMessageImage";
import ChatMessageVideo from "./ChatMessageVideo";
import ChatMessageAudio from "./ChatMessageAudio";

import ChatMessageOptionals from "./ChatMessageOptionals";
import UserType from "../../../libs/types/UserType";

const TAG = "CHAT ROOM MESSAGE";
type ChatRoomMessageProps = {
  msj: RoomMessageType;
  chatRoomModule: ChatRoomModule;
};
const ChatRoomMessage: React.FC<ChatRoomMessageProps> = ({
  msj,
  chatRoomModule,
}) => {
  const theme = useTheme();
  const [titleMessage, setTitleMessage] = useState("");
  const [updateViewVisible, setUpdateViewVisible] = useState(0);
  const [user, setUser] = useState<UserType>(new UserType("", {}));
  useEffect(() => {
    msj.updateView = (module) => {
      if (module === "VISIBLE") {
        setUpdateViewVisible(updateViewVisible + 1);
      }
    };
  }, [msj, updateViewVisible]);

  useEffect(() => {
    if (msj.firstMessage || msj.lastMessage) {
      chatRoomModule.getUserInfo(msj.creator, (userInfo) => {
        setUser(userInfo);
        setTitleMessage(userInfo.name);
      });
    }
  }, [msj, chatRoomModule, setTitleMessage]);

  const customStyles = useMemo(() => {
    const isme: boolean = msj.creator === api.users.currentUser.id;

    const containerStyles = {
      ...styles.container,
      paddingTop: msj.firstMessage ? 8 : styles.container.paddingTop,
    };
    const subContainerStyles = {
      flexDirection: undefined,
      alignSelf: undefined,
    };
    let panelBorder = { ...utils.objects.cloneObject(styles.panelBorder) };

    if (isme) {
      panelBorder = {
        ...panelBorder,
        ...styles.mePanelBorder,
        backgroundColor: theme["color-primary-400"],
      };
      subContainerStyles.flexDirection = "row";
      subContainerStyles.alignSelf = "flex-end";
    } else {
      panelBorder = {
        ...panelBorder,
        ...styles.otherPanelborder,
        backgroundColor: theme["color-primary-500"],
      };

      subContainerStyles.flexDirection = "row";
    }
    if (msj.type === "image") {
      panelBorder = {
        ...panelBorder,
        paddingVertical: 1,
        paddingHorizontal: 1,
      };
    }
    return {
      containerStyles: containerStyles,
      subContainerStyles: subContainerStyles,
      panelBorder: panelBorder,
    };
  }, [msj, theme]);

  return (
    <View style={customStyles.containerStyles}>
      <View style={customStyles.subContainerStyles}>
        <ChatMessageAvatar
          user={user}
          msj={msj}
          updateViewCounter={updateViewVisible}
        />
        <View style={customStyles.panelBorder}>
          <ChatMessageTitle msj={msj} text={titleMessage} />
          {msj.type === "text" && <ChatMessageText msj={msj} />}
          {msj.type === "image" && <ChatMessageImage msj={msj} />}
          {msj.type === "video" && <ChatMessageVideo msj={msj} />}
          {msj.type === "audio" && <ChatMessageAudio msj={msj} />}
        </View>
        <ChatMessageOptionals msj={msj} />
      </View>
    </View>
  );
};
export default ChatRoomMessage;
