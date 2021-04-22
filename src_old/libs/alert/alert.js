import { Alert } from "react-native";
class CAlert {
  constructor() {

  }
  show(title = "", message = "", cancelable = true) {
    Alert.alert(title, message, [
      { text: 'OK', onPress: () => console.log('OK Pressed') },
      { text: 'Cancel', onPress: () => console.log('OK Pressed') }
    ], { cancelable: cancelable })
  }
}
export default new CAlert()