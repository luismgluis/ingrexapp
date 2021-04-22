import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

import MapScreen from "../MapScreen/MapScreen";
import Panel from "../Panel/Panel";
import HomeTopBar from "./HomeTopBar";
import { useFocusEffect } from "@react-navigation/native";
import CustomBackHandler from "../../libs/modules/CustomBackHandler";

import LoadingPanel from "../LoadingPanel/LoadingPanel";
import ChatRoom from "../ChatRoom/ChatRoom";
import utils from "../../libs/utils/utils";
import { Text, useTheme } from "@ui-kitten/components";
import HomeModule, { ChannelsListItem } from "./HomeModule";
import ListChannels from "../Channels/ListChannels";
import GroupType from "../../libs/types/GroupType";
import { useDispatch, useSelector } from "react-redux";
import { setCurrentReduxGroup } from "../../reducers/actions/actionsCurrentSession";
const TAG = "HOME";

const styles = StyleSheet.create({
  paper: { flex: 12 },
  pagerPanel: { flex: 12 },
});

type HomeProps = {
  navigation: any;
  route: any;
};

const Home: React.FC<HomeProps> = ({ navigation, route }) => {
  useFocusEffect(
    CustomBackHandler(() => {
      return true;
    }),
  );
  const theme = useTheme();
  const pagerViewRef = useRef<PagerView>();
  const dispatch = useDispatch();
  const [CFORCE, setCFORCE] = useState(0);
  const [withoutGroups, setWithoutGroups] = useState(false);
  const [channelsLoading, setChannelsLoading] = useState(true);
  const [selectedIndexPage, setSelectedIndexPage] = useState(1);

  const currentGroup = useSelector<GroupType, GroupType>((state: any) => {
    if (state.currentSession.group) {
      return state.currentSession.group;
    }
    return new GroupType("", {});
  });

  const [channelsListItems, setChannelsListItems] = useState<
    ChannelsListItem[]
  >([]);

  const module = useMemo(() => new HomeModule(theme), [theme]);

  useEffect(() => {
    if (channelsListItems.length > 0 || withoutGroups)
      setChannelsLoading(false);
  }, [channelsListItems, withoutGroups]);

  useEffect(() => {
    if (withoutGroups) {
      module.alertJoinToGroup((data) => {
        console.log(TAG, "data", data);
        if (data !== null) {
          dispatch(setCurrentReduxGroup(data));
        }
        setCFORCE(CFORCE + 1);
      });
    }
  }, [withoutGroups, module, CFORCE, dispatch]);

  useEffect(() => {
    const onLoadChannels = (channelsLoaded: ChannelsListItem[]) => {
      if (channelsLoaded.length === 0) {
        setWithoutGroups(true);
        return;
      }
      setWithoutGroups(false);
      setChannelsListItems(channelsLoaded);
    };
    if (CFORCE >= 0) module.getChannels((data) => onLoadChannels(data));
  }, [withoutGroups, module, CFORCE]);

  const onChangeListChannels = useCallback((listItem: ChannelsListItem) => {
    pagerViewRef.current?.setPage(listItem.index);
    setSelectedIndexPage(listItem.index);
  }, []);

  return (
    <Panel key={"GroupHomeKey" + currentGroup.id} style={styles.paper}>
      <HomeTopBar gropSelected={currentGroup} />
      {channelsListItems.length > 0 && (
        <ListChannels
          channelsList={channelsListItems}
          pageSelected={selectedIndexPage}
          onChange={(listItem) => onChangeListChannels(listItem)}
        />
      )}
      {channelsLoading && <LoadingPanel text="Loading channels..." />}
      {!channelsLoading && !withoutGroups && (
        <PagerView
          ref={pagerViewRef}
          style={styles.paper}
          scrollEnabled={true}
          onPageSelected={(e) => setSelectedIndexPage(e.nativeEvent.position)}
          initialPage={selectedIndexPage}>
          {channelsListItems.map((item) => {
            if (item.module === "channel") {
              return (
                <View
                  key={`ChatRoom_${item.channel.chatRoomID}`}
                  style={styles.pagerPanel}>
                  <ChatRoom roomID={item.channel.chatRoomID} />
                </View>
              );
            }
            if (item.module === "map") {
              return (
                <View
                  key={utils.generateKey("MapScreen")}
                  style={styles.pagerPanel}>
                  <MapScreen pagerFocus={item.index === selectedIndexPage} />
                </View>
              );
            }
            return <></>;
          })}
        </PagerView>
      )}
      {withoutGroups && (
        <Panel verticalCenter={true}>
          <Text category="h3">Without group</Text>
        </Panel>
      )}
    </Panel>
  );
};

export default Home;
