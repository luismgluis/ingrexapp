import { StyleSheet, View, Text } from "react-native";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { createStackNavigator } from "@react-navigation/stack";
import Album from "./Album";
import Camera from "./Camera";
import LoadingPanel from "../LoadingPanel/LoadingPanel";
import CButton from "../CButton/CButton";
import { FeedImageType } from "../FeedImages/FeedImages";
import permissions from "../../libs/utils/permissions";
import Panel from "../Panel/Panel";
import { Func0, Func1 } from "redux";

const styles = StyleSheet.create({ container: {} });

const TAG = "GALLERY STACK";

const { Navigator, Screen } = createStackNavigator();

type GalleryStackProps = {
  navigation: any;
  route: any;
};
type GalleryLoadingProps = {
  goBack: () => void;
  onSuccess: () => void;
};
const GalleryLoading: React.FC<GalleryLoadingProps> = ({
  goBack,
  onSuccess,
}) => {
  const [permissionsEnabled, setPermissionsEnabled] = useState(false);
  const [backButtonVisible, setBackButtonVisible] = useState(false);
  const [loadingText, setLoadingText] = useState("Await Gallery");
  useEffect(() => {
    if (permissionsEnabled) {
      return;
    }
    permissions
      .checkAllPermissions()
      .then((result) => {
        if (result) {
          setPermissionsEnabled(true);
          onSuccess();
          return;
        }
      })
      .catch(() => {
        setLoadingText("Need permission Read, Write and Camera");
        setBackButtonVisible(true);
      });
  }, [permissionsEnabled, onSuccess]);

  return (
    <>
      <LoadingPanel text={loadingText} />
      {backButtonVisible && (
        <CButton
          onPress={() => {
            goBack();
          }}
          text="Cancel"
        />
      )}
    </>
  );
};
type GalleryNavigatorProps = {
  callBack: (data) => void;
};
const GalleryNavigator: React.FC<GalleryNavigatorProps> = ({ callBack }) => {
  //const [callBack, setCallBack] = useState({ fun: null });

  const CAlbum = useMemo(
    () => (props) => <Album {...props} callBack={callBack} />,
    [callBack],
  );
  const CCamera = useMemo(
    () => (props) => <Camera {...props} callBack={callBack} />,
    [callBack],
  );
  return (
    <Navigator
      headerMode="none"
      initialRouteName="Album"
      screenOptions={{ headerShown: false }}>
      <Screen name="Album" component={CAlbum} />
      <Screen name="Camera" component={CCamera} />
    </Navigator>
  );
};
const GalleryStack: React.FC<GalleryStackProps> = ({ navigation, route }) => {
  const [loading, setLoading] = useState(true);
  const goBack = useRef(() => navigation.goBack());
  const callBack = useRef(
    (() => {
      const cleanFn = (data) => null;
      try {
        const fn = route.params.myCallBack;
        if (typeof fn === "function") {
          const newFun = (data) => {
            fn(data);
            navigation.goBack();
          };
          return newFun;
        }
        return cleanFn;
      } catch (error) {
        console.error(TAG, "fail in props gallery");
        return cleanFn;
      }
    })(),
  );
  //{!loading && <GalleryNavigator callBack={callBack.current} />}
  return (
    <Panel totalHeight={0}>
      {loading && (
        <GalleryLoading
          goBack={() => goBack.current()}
          onSuccess={() => setLoading(false)}
        />
      )}
      {!loading && <GalleryNavigator callBack={callBack.current} />}
    </Panel>
  );
};
export default GalleryStack;
