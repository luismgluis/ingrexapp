import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { StyleSheet, View } from "react-native";
import PagerView from "react-native-pager-view";

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
import UsersAccess from "../UsersAccess/UsersAccess";
import UsersHistory from "../UsersHistory/UsersHistory";
import UsersRegister from "../UsersRegister/UsersRegister";
import api from "../../libs/api/api";
const TAG = "HOME";

const styles = StyleSheet.create({
  paper: { flex: 12 },
  pagerPanel: { flex: 12 },
});

type HomeProps = {
  navigation: any;
  route: any;
};
let rendercounter = 0;
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
  const [selectedIndexPage, setSelectedIndexPage] = useState(0);

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

  const selectGroup = useCallback(
    (firsTime: boolean) => {
      if (firsTime) {
        module.alertJoinToGroup((newGroup) => {
          console.log(TAG, "data", newGroup);
          if (newGroup !== null) {
            dispatch(setCurrentReduxGroup(newGroup));
            setCFORCE(CFORCE + 1);
          }
        });
        return;
      }
      module.alertChangeGroup((newGroup) => {
        if (newGroup !== null) {
          dispatch(setCurrentReduxGroup(newGroup));
          setCFORCE(CFORCE + 1);
        }
      });
    },
    [module, CFORCE, dispatch],
  );
  useEffect(() => {
    if (channelsListItems.length > 0 || withoutGroups)
      setChannelsLoading(false);
  }, [channelsListItems, withoutGroups]);

  useEffect(() => {
    if (withoutGroups) {
      selectGroup(true);
    }
    return () => module.closeCurrentAlert();
  }, [withoutGroups, selectGroup, module]);

  useEffect(() => {
    const onLoadChannels = (channelsLoaded: ChannelsListItem[]) => {
      if (currentGroup.isEmpty() && !api.group.currentGroupData.isEmpty()) {
        dispatch(setCurrentReduxGroup(api.group.currentGroupData));
      }
      if (channelsLoaded.length === 0) {
        setWithoutGroups(true);
        return;
      }
      setWithoutGroups(false);
      setChannelsListItems(channelsLoaded);
    };
    if (CFORCE >= 0) module.getChannels((data) => onLoadChannels(data));
  }, [module, CFORCE, dispatch, currentGroup]);

  const onChangeListChannels = useCallback((listItem: ChannelsListItem) => {
    pagerViewRef.current?.setPage(listItem.index);
    setSelectedIndexPage(listItem.index);
  }, []);

  console.log(
    TAG,
    "selectedIndexPage",
    selectedIndexPage,
    "rendercounter:",
    rendercounter++,
  );
  return (
    <Panel
      level="5"
      key={"GroupHomeKey" + currentGroup.id}
      style={styles.paper}>
      <HomeTopBar
        onGroupPress={() => selectGroup(false)}
        gropSelected={currentGroup}
      />
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
            } else {
              return (
                <View key={item.module + item.key} style={styles.pagerPanel}>
                  <>
                    {item.module === "access" && (
                      <UsersAccess
                        pagerFocus={item.index === selectedIndexPage}
                      />
                    )}
                    {item.module === "history" && (
                      <UsersHistory
                        pagerFocus={item.index === selectedIndexPage}
                      />
                    )}
                    {item.module === "register" && (
                      <UsersRegister
                        pagerFocus={item.index === selectedIndexPage}
                      />
                    )}
                  </>
                </View>
              );
            }
          })}
        </PagerView>
      )}
      {withoutGroups && (
        <Panel verticalCenter={true} horizontalCenter={true}>
          <Text category="h3">Without group</Text>
        </Panel>
      )}
    </Panel>
  );
};

export default Home;
