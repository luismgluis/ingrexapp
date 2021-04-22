import {
  StyleSheet,
  View,
  FlatList,
  RefreshControl,
  ViewToken,
} from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";
import ChatRoomBottomBanner from "./ChatRoomBottom/ChatRoomBottomBanner";

import { useKeyboard } from "../../libs/usekeyBoard/useKeyBoard";
import RoomMessageType from "../../libs/types/RoomMessageType";
import ChatRoomMessage from "./ChatRoomMessage/ChatRoomMessage";
import ChatRoomModule from "./ChatRoomModule";
import Panel from "../Panel/Panel";
import utils from "../../libs/utils/utils";

const TAG = "CHAT ROOM";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 50,
  },
  flatList: { paddingBottom: 10 },
});

type ChatRoomProps = {
  roomID: string;
};

const startValues = { keyBoardHeight: 0 };

const ChatRoom: React.FC<ChatRoomProps> = ({ roomID }) => {
  const myFlatList = useRef<FlatList<RoomMessageType>>();
  const [messages, setMessages] = useState<Array<RoomMessageType>>([]);
  const [keyboardHeight] = useKeyboard();
  const [roomModule, setRoomModule] = useState(new ChatRoomModule(""));
  const [firstMessages, setFirstMessages] = useState(false);

  const scrollDown = useCallback(async () => {
    [0, 1, 2].forEach((val) => {
      utils.timeOut(100 * val).then(() => {
        myFlatList.current?.scrollToEnd({ animated: true });
      });
    });
  }, [myFlatList]);

  useEffect(() => {
    roomModule.setRoomID(roomID);
    const unsubs = roomModule.getMessages((data: Array<RoomMessageType>) => {
      setMessages(data);
      if (!firstMessages) {
        setFirstMessages(true);
        setTimeout(() => {
          scrollDown();
        }, 100);
      }
    });
    return () => {
      unsubs();
    };
  }, [
    roomModule,
    setMessages,
    roomID,
    firstMessages,
    setFirstMessages,
    scrollDown,
  ]);
  useEffect(() => {
    if (keyboardHeight !== 0) {
      scrollDown();
    }
  }, [keyboardHeight, scrollDown]);
  const reciveNewMessage = (msj: RoomMessageType) => {
    setMessages([...messages, msj]);
    roomModule.saveMessage(msj);
    scrollDown();
  };

  const renderItem = (msj: RoomMessageType) => {
    return <ChatRoomMessage chatRoomModule={roomModule} msj={msj} />;
  };

  if (startValues.keyBoardHeight !== keyboardHeight) {
    scrollDown();
    startValues.keyBoardHeight = keyboardHeight;
  }

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    roomModule
      .getOldsMessages()
      .then((res) => {
        setRefreshing(false);
      })
      .catch(() => {
        setRefreshing(false);
      });
  }, [roomModule]);

  const onViewableItemsChanged = React.useCallback(
    ({ viewableItems, changed }) => {
      const analice = (msj: RoomMessageType, visible = false) => {
        msj.setIsVisible(visible);
        msj.updateView("VISIBLE");
      };
      viewableItems.forEach((element) => {
        analice(element.item, element.isViewable);
      });
    },
    [],
  );
  return (
    <Panel level="5" style={styles.container}>
      <FlatList
        ref={myFlatList}
        contentContainerStyle={styles.flatList}
        data={messages}
        renderItem={(item) => renderItem(item.item)}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="always"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
      />
      <ChatRoomBottomBanner
        onFocus={() => scrollDown()}
        onSend={reciveNewMessage}
      />
    </Panel>
  );
};
export default ChatRoom;
