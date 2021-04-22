import { createStackNavigator } from "@react-navigation/stack";

import React, { useEffect, useMemo } from "react";
import Home from "./src/components/Home/Home";
import LoadingScreen from "./src/components/LoadingScreen/LoadingScreen";
import Gallery from "./src/components/Gallery/GalleryStack";

import api from "./src/libs/api/api";
import ImageViewer from "./src/components/ImageViewer/ImageViewer";
import LoginStack from "./src/components/Login/LoginStack";
import { useDispatch, useSelector } from "react-redux";
import UserType from "./src/libs/types/UserType";
import utils from "./src/libs/utils/utils";
import { setCurrentReduxUser } from "./src/reducers/actions/actionsCurrentSession";
import { useNavigation } from "@react-navigation/core";
const TAG = "APP NAV";

const { Navigator, Screen } = createStackNavigator();

const ScreenLoading = (props) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  useEffect(() => {
    api.users.onCurrentUserUpdate((user) => {
      dispatch(setCurrentReduxUser(user));
      if (user.isEmpty()) {
        navigation.navigate("Login");
        return;
      }
      navigation.navigate("Home");
    });
    return () => {
      //unsubs();
    };
  }, [navigation, dispatch]);

  return <LoadingScreen title="Welcome!" subTitle="wait, let's start" />;
};

const KeyByCurrentUser = () => {
  const currentUser: UserType = useSelector((store: any) => {
    const user = store.currentSession.user;
    if (!utils.objects.isEmpty(user)) {
      return user;
    }
    return generals.lastUserUpdate;
  });
  const navigatorKey = useMemo(() => {
    return "NavigatorKey_" + currentUser.id;
  }, [currentUser]);
  return navigatorKey;
};

type generalsType = {
  lastUserUpdate: UserType;
};

const generals: generalsType = { lastUserUpdate: new UserType("", {}) };

const AppNav: React.FC = () => {
  const dispatch = useDispatch();
  const navigatorKey = KeyByCurrentUser();
  useEffect(() => {
    api.users.onCurrentUserUpdate((user) => {
      if (!utils.objects.isEmpty(user)) {
        if (generals.lastUserUpdate.id !== user.id) {
          generals.lastUserUpdate = user;
          if (!user.isEmpty()) {
            dispatch(setCurrentReduxUser(user));
          }
        }
      }
    });
    return () => {
      //unsubs();
    };
  }, [dispatch]);

  return (
    <Navigator
      key={navigatorKey}
      headerMode="none"
      initialRouteName="LoadingScreen"
      screenOptions={{ headerShown: false }}>
      <Screen name="LoadingScreen" component={ScreenLoading} />
      <Screen name="Home" component={Home} />
      <Screen name="Gallery" component={Gallery} />
      <Screen name="ImageViewer" component={ImageViewer} />
      <Screen name="Login" component={LoginStack} />
    </Navigator>
  );
};
export default AppNav;
