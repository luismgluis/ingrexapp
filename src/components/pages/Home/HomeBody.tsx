import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import React, { useCallback, useEffect, useRef, useState } from "react";

import PagerView from "react-native-pager-view";
import LoadingPanel from "../../ui/LoadingPanel/LoadingPanel";
import { Text, useTheme } from "@ui-kitten/components";
import ListChannels from "../../ui/Channels/ListChannels";
import { useCurrentGroup } from "../../hooks/useCurrentGroup";
import { useCurrentUser } from "../../hooks/useCurrentUser";
import Panel from "../../ui/Panel/Panel";
import { ChannelsListItem, HomeModule } from "./HomeModule";
const styles = StyleSheet.create({
  pagerView: {
    flex: 12,
    backgroundColor: "red",
  },
  flexx: {
    flex: 12,
    backgroundColor: "red",
  },
});

const TAG = "HOME BODY";
type HomeBodyProps = {
  style?: StyleProp<ViewStyle>;
};

const HomeBody: React.FC<HomeBodyProps> = ({ style }) => {
  const theme = useTheme();
  const group = useCurrentGroup();
  const user = useCurrentUser();
  const { getChannels } = HomeModule();
  const [channelsListItems, setChannelsListItems] = useState<
    ChannelsListItem[]
  >([]);
  const [channelsLoading, setChannelsLoading] = useState(false);
  const pagerViewRef = useRef<PagerView>();
  const [pagerSelected, setPagerSelected] = useState(0);
  const onChangeListChannels = useCallback((listItem: ChannelsListItem) => {
    pagerViewRef.current?.setPage(listItem.index);
    setPagerSelected(listItem.index);
  }, []);

  useEffect(() => {
    if (group.isEmpty()) return;
    setChannelsLoading(true);
    getChannels((data) => {
      console.log(TAG, "getChannels result", data);
      setChannelsLoading(false);
      setChannelsListItems(data);
    });
  }, [group]);

  console.log(TAG, group, channelsListItems);
  return (
    <View style={style}>
      {channelsListItems.length > 0 && (
        <ListChannels
          channelsList={channelsListItems}
          pageSelected={pagerSelected}
          onChange={(listItem) => onChangeListChannels(listItem)}
        />
      )}
      <Text>ssssss</Text>
      <Text>ññññ</Text>
      {channelsLoading && <LoadingPanel text="Loading group" />}
      {group.isEmpty() && (
        <Panel verticalCenter={true} horizontalCenter={true}>
          <Text category="h3">Without group</Text>
        </Panel>
      )}
      {!group.isEmpty() && channelsListItems.length > 0 && (
        <View style={styles.pagerView}>
          <Text>ssaaaaa</Text>
        </View>
      )}
    </View>
  );
};
/*if (item.module === "channel") {
              return (
                <View
                  style={styles.flexx}
                  key={`ChatRoom_${item.channel.chatRoomID}`}>
                  <ChatRoom roomID={item.channel.chatRoomID} />
                </View>
              );
            } else {
              return (
                <View style={styles.flexx} key={item.module + item.key}>
                  <>
                    {item.module === "access" && (
                      <UsersAccess pagerFocus={item.index === pagerSelected} />
                    )}
                    {item.module === "history" && (
                      <UsersHistory pagerFocus={item.index === pagerSelected} />
                    )}
                    {item.module === "register" && (
                      <UsersRegister
                        pagerFocus={item.index === pagerSelected}
                      />
                    )}
                  </>
                </View>
              );
            } */
/*{channelsLoading && <LoadingPanel text="Loading channels..." />}
      {!channelsLoading && !group.isEmpty() && (
        <PagerView
          ref={pagerViewRef}
          style={styles.paper}
          scrollEnabled={true}
          onPageSelected={(e) => setPagerSelected(e.nativeEvent.position)}
          initialPage={pagerSelected}>
          {channelsListItems.map((item) => {
            if (item.module === "channel") {
              return (
                <Panel flex={12} key={`ChatRoom_${item.channel.chatRoomID}`}>
                  <ChatRoom roomID={item.channel.chatRoomID} />
                </Panel>
              );
            } else {
              return (
                <Panel key={item.module + item.key} flex={12}>
                  <>
                    {item.module === "access" && (
                      <UsersAccess pagerFocus={item.index === pagerSelected} />
                    )}
                    {item.module === "history" && (
                      <UsersHistory pagerFocus={item.index === pagerSelected} />
                    )}
                    {item.module === "register" && (
                      <UsersRegister
                        pagerFocus={item.index === pagerSelected}
                      />
                    )}
                  </>
                </Panel>
              );
            }
          })}
        </PagerView>
      )} */
export default HomeBody;
