import { PermissionsAndroid } from "react-native";
const TAG = "PERMISSIONS"
const requestPermission = async (title, message, permissionName) => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS[permissionName],
      {
        title: title,
        message: message,
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK"
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log(TAG, "You can use permission", permissionName);
      return true
    }
    console.log(TAG, "permission denied", permissionName);
    return false
  } catch (err) {
    console.warn(TAG, "permission fail", err);
    return false
  }
};

const requestCameraPermission = async () => {
  return await requestPermission("Please allow camera access",
    "This is necesary to take a picture",
    "CAMERA")
};
const requestReadFilesPermission = async () => {
  return await requestPermission("Please allow read access",
    "This is necesary to access pictures",
    "READ_EXTERNAL_STORAGE")
};
const requestWriteFilesPermission = async () => {
  return await requestPermission("Please allow write access",
    "This is necesary to access pictures",
    "WRITE_EXTERNAL_STORAGE")
};

const checkPermission = async (permission) => {
  try {
    const res = await PermissionsAndroid.check(permission);
    console.log(TAG, "Permission", permission, res);
    return res;
  } catch (error) {
    console.log(TAG, "Check Permission Fail", error);
    return null;
  }
}
const permissionsTypes = {
  CAMERA: PermissionsAndroid.PERMISSIONS.CAMERA,
  READ: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  WRITE: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
}

export default {
  requestCameraPermission,
  requestReadFilesPermission,
  requestWriteFilesPermission,
  checkPermission,
  permissionsTypes
}