import React, { useState, useEffect, useCallback } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { PermissionsAndroid } from "react-native";
import Album from "./Album";
import Camera from "./Camera";
import LoadingPanel from "./../../UI/LoadingPanel/LoadingPanel";
import permissionsUtils from "./../../../libs/utils/permissions";
import { Button } from "@ui-kitten/components";
const { Navigator, Screen } = createStackNavigator();

const Gallery = (props) => {
  const TAG = "GALLERY";
  console.log(TAG, "Gallery", props);

  let callBack = () => { }
  try {
    const fn = props.route.params.callBack;
    if (typeof fn === "function") {
      callBack = fn;
    }
    console.log(TAG, callBack);
  } catch (error) {
    console.log(TAG, "fail in props gallery");
  }

  const [backButtonVisible, setBackButtonVisible] = useState(false);
  const [loadingText, setLoadingText] = useState("Await Gallery");
  const CAlbum = () => {
    return <Album {...props} callBack={callBack} />;
  }
  const CCamera = () => {
    return <Camera {...props} callBack={callBack} />;
  }
  const Loading = (<>
    <LoadingPanel text={loadingText} />
    {backButtonVisible && <Button status="danger">Cancel</Button>}
  </>);
  const NavigatorP = (<Navigator
    headerMode="none"
    initialRouteName="Album"
    screenOptions={{ headerShown: false }}>
    <Screen name="Album" component={CAlbum} />
    <Screen name="Camera" component={CCamera} />
  </Navigator>)
  const [permissionsEnabled, setPermissionsEnabled] = useState(false);
  let checkPermissions = useCallback(async () => {
    let cameraGranted = await permissionsUtils.checkPermission(permissionsUtils.permissionsTypes.CAMERA);
    if (!cameraGranted) {
      cameraGranted = await permissionsUtils.requestCameraPermission();
      if (!cameraGranted) { return }
    }
    let readGranted = await permissionsUtils.checkPermission(permissionsUtils.permissionsTypes.READ);
    if (!readGranted) {
      readGranted = await permissionsUtils.requestReadFilesPermission();
      if (!readGranted) { return }
    }
    let writeGranted = await permissionsUtils.checkPermission(permissionsUtils.permissionsTypes.WRITE);
    if (!writeGranted) {
      writeGranted = await permissionsUtils.requestWriteFilesPermission();
      if (!writeGranted) { return }
    }

    if (cameraGranted && readGranted && writeGranted) {
      setPermissionsEnabled(true);
    } else {
      setBackButtonVisible(false);
      setLoadingText("Need permission Read, Write, Camerta");
    }
    //setPermissionsEnabled(true);
  })
  useEffect(() => {
    checkPermissions()
  }, [])

  return (
    <>
      { permissionsEnabled && NavigatorP}
      { !permissionsEnabled && Loading}
    </>
  );
};

export default Gallery;
