import { createStackNavigator } from "@react-navigation/stack";
import React, { useEffect } from "react";
import api from "./src/libs/api/api";
import LoginStack from "./src/components/pages/Login/LoginStack";
import { useDispatch } from "react-redux";
import UserType from "./src/libs/types/UserType";
import utils from "./src/libs/utils/utils";
import { setCurrentReduxUser } from "./src/reducers/actions/actionsCurrentSession";
import { useNavigation } from "@react-navigation/core";
import LoadingScreen from "./src/components/ui/LoadingScreen/LoadingScreen";
import Home from "./src/components/pages/Home/Home";
import GalleryStack from "./src/components/pages/Gallery/GalleryStack";
import ImageViewer from "./src/components/ui/ImageViewer/ImageViewer";
import QRScannerScreen from "./src/components/ui/QRScanner/QRScannerScreen";
import PrivateRoute from "./src/components/ui/PrivateRoute/PrivateRoute";
import { useCurrentUser } from "./src/components/hooks/useCurrentUser";

const TAG = "APP NAV";

const { Navigator, Screen } = createStackNavigator();

const ScreenLoading = (props: any) => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Home");
    }, 200);
  }, [navigation]);
  return <LoadingScreen title="Welcome!" subTitle="wait, let's start" />;
};

const AppNav: React.FC = () => {
  const dispatch = useDispatch();
  const me = useCurrentUser();
  useEffect(() => {
    const unsubs = api.users.onCurrentUserUpdate((user) => {
      if (!utils.objects.isEmpty(user)) {
        if (me.id !== user.id) {
          if (!user.isEmpty()) {
            dispatch(setCurrentReduxUser(user));
          }
        }
      }
    });
    return () => {
      unsubs();
    };
  }, [dispatch]);

  return (
    <>
      <Navigator
        key={me.id}
        headerMode="none"
        initialRouteName="LoadingScreen"
        screenOptions={{ headerShown: false }}>
        <PrivateRoute name="LoadingScreen" component={ScreenLoading} />
        <Screen name="Home" component={Home} />
        <Screen name="Gallery" component={GalleryStack} />
        <Screen name="ImageViewer" component={ImageViewer} />
        <Screen name="Login" component={LoginStack} />
        <Screen name="QrScanner" component={QRScannerScreen} />
      </Navigator>
    </>
  );
};
export default AppNav;
