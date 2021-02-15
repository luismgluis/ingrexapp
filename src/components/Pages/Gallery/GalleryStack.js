import React, { useState, useEffect, useCallback } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { PermissionsAndroid } from "react-native";
import Album from "./Album";
import Camera from "./Camera";
import LoadingPanel from "./../../UI/LoadingPanel/LoadingPanel";
import permissionsUtils from "./../../../libs/utils/permissions";
const { Navigator, Screen } = createStackNavigator();

const Gallery = (props) => {
  const Loading = <><LoadingPanel text="Await Permissions" /></>;
  const NavigatorP = (<Navigator
    headerMode="none"
    initialRouteName="Album"
    screenOptions={{ headerShown: false }}>
    <Screen name="Album" component={Album} />
    <Screen name="Camera" component={Camera} />
  </Navigator>)
  const [permissionsEnabled, setPermissionsEnabled] = useState(false);
  let vaaa = useCallback(async () => {
    console.log("useeee");
    /* let cameraGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.CAMERA);
     if (!cameraGranted) {
       cameraGranted = await permissionsUtils.requestCameraPermission();
       if (!cameraGranted) { return }
     }
     let readGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
     if (!readGranted) {
       readGranted = await permissionsUtils.requestReadFilesPermission();
       if (!readGranted) { return }
     }
     let writeGranted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
     if (!writeGranted) {
       writeGranted = await permissionsUtils.writeGranted();
       if (!writeGranted) { return }
     }
 
     if (cameraGranted && readGranted && writeGranted) {
       setPermissionsEnabled(true);
     } */
    setPermissionsEnabled(true);
  })
  useEffect(() => {
    console.log("efeeect");
    vaaa()
  }, [vaaa])

  return (
    <>
      { permissionsEnabled && NavigatorP}
      { !permissionsEnabled && Loading}
    </>
  );
};

export default Gallery;
