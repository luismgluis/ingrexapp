import React from "react";
import { StyleSheet } from "react-native";
import Panel from "../../ui/Panel/Panel";
import { HomeModule } from "./HomeModule";
import HomeTopBar from "./HomeTopBar";
const TAG = "HOME";
type HomeProps = {};
const styles = StyleSheet.create({ paper: {} });
const Home: React.FC<HomeProps> = (props) => {
  const {
    user,
    group,
    theme,
    alertJoinToGroup,
    alertChangeGroup,
    confirmJoinToGroup,
    joinGroup,
    createGroup,
    getChannels,
    closeCurrentAlert,
  } = HomeModule();
  return (
    <Panel level="5" key={"GroupHomeKey" + group.id} style={styles.paper}>
      <HomeTopBar />
      {/* {!group.isEmpty() && <HomeBody />}
      {group.isEmpty() && <Text category="h5">...</Text>} */}
    </Panel>
  );
};

/* const user = useCurrentUser();
  const group = useCurrentGroup();
  const theme = useTheme();
  const module = useMemo(() => new HomeModule(theme), [theme]);

  useFocusEffect(
    CustomBackHandler(() => {
      return true;
    }),
  );
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(TAG, "load grouppp", user, group);
    if (user.isEmpty()) return;
    if (!group.isEmpty()) return;

    const action = (groups: string[]) => {
      api.group
        .getGroupByID(groups[0])
        .then((groupInfo) => {
          console.log(TAG, groupInfo);
          dispatch(setCurrentReduxGroup(groupInfo));
        })
        .catch(() => null);
    };
    api.group
      .getUserGroups(user.id)
      .then((groups) => {
        if (groups.length === 0) {
          module.alertJoinToGroup((newGroup) => {
            console.log(TAG, "data", newGroup);
            if (newGroup !== null) {
              dispatch(setCurrentReduxGroup(newGroup));
            }
          });
          return;
        }
        action(groups);
      })
      .catch(() => null);
  }, [user, group, dispatch, module]); const pagerViewRef = useRef<PagerView>();
  const dispatch = useDispatch();
  const [CFORCE, setCFORCE] = useState(0);
  const [withoutGroups, setWithoutGroups] = useState(false);
  const [channelsLoading, setChannelsLoading] = useState(true);
  const [selectedIndexPage, setSelectedIndexPage] = useState(0);

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
      if (group.isEmpty() && !api.group.currentGroupData.isEmpty()) {
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
  }, [module, CFORCE, dispatch, group]);

  const onChangeListChannels = useCallback((listItem: ChannelsListItem) => {
    pagerViewRef.current?.setPage(listItem.index);
    setSelectedIndexPage(listItem.index);
  }, []); */
export default Home;
