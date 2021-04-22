import { View } from "react-native";
import React from "react";
import RoomMessageType from "../../../libs/types/RoomMessageType";
import api from "../../../libs/api/api";
import CAvatar from "../../CAvatar/CAvatar";

import styles from "./ChatMessageStyles";
import UserType from "../../../libs/types/UserType";

const TAG = "CHAT MESSAGE AVATAR";

type ChatMessageAvatarProps = {
  msj: RoomMessageType;
  user: UserType;
  updateViewCounter: number;
};
const ChatMessageAvatar: React.FC<ChatMessageAvatarProps> = ({
  msj,
  user,
  updateViewCounter,
}) => {
  const showElement = React.useMemo(() => {
    if (!isNaN(updateViewCounter) && msj.isVisibleMessage) {
      return msj.firstMessage || msj.lastMessage;
    }
    return false;
  }, [msj, updateViewCounter]);
  const avatarStyles = { ...styles.avatarStyles };
  const isme: boolean = msj.creator === api.users.currentUser.id;
  if (!showElement) {
    avatarStyles.height = 0;
  }

  return (
    <>
      {!isme && (
        <View style={avatarStyles}>
          {showElement && user.profileImage !== "" && (
            <CAvatar urlImage={user.profileImage} />
          )}
        </View>
      )}
    </>
  );
};
export default ChatMessageAvatar;
