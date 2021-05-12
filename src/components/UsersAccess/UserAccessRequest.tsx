import {
  StyleSheet,
  View,
  StyleProp,
  ViewStyle,
  Linking,
  Platform,
} from "react-native";
import React, { useState } from "react";
import Panel from "../Panel/Panel";
import { Text } from "@ui-kitten/components";
import CButton from "../CButton/CButton";
import { ResidentType } from "../../libs/types/ResidentType";
import utils from "../../libs/utils/utils";

const styles = StyleSheet.create({
  container: {},
  panelButtons: {
    flexDirection: "row",
    width: "100%",
  },
  title: { textAlign: "center" },
});

const TAG = "USER ACCESS REQUEST ACCESS";
type UserAccessRequestProps = {
  style?: StyleProp<ViewStyle>;
  onConfirm: (result: boolean) => void;
  resident: ResidentType;
  visitor: ResidentType;
};
const UserAccessRequest: React.FC<UserAccessRequestProps> = ({
  onConfirm,
  resident,
  visitor,
  style,
}) => {
  const [confirmationSent, setConfirmationSent] = useState(false);
  const openTelegram = () => {
    setConfirmationSent(true);
    //https://t.me/luismigraja?text=hola
    // whatsapp://send?phone=573166478046&text=hola
    const sp = Platform.OS === "ios" ? "&" : "?";
    Linking.openURL("https://telegram.me/catmely?msj=Mi_mensaje");
    //Linking.openURL(`tg://${resident.telegram}?text=Mi_mensaje`);
  };
  const openCallPhone = () => {
    setConfirmationSent(true);
    //https://t.me/luismigraja?text=hola
    Linking.openURL(`tel:${resident.phone}`);
  };
  const styleContainer = {
    ...utils.objects.cloneObject(style),
    ...styles.container,
  };
  return (
    <Panel totalHeight="70%" style={styleContainer}>
      {!confirmationSent && (
        <Panel>
          <Panel verticalCenter={true} paddingVertical={0}>
            <Text style={styles.title} category="h4">
              Select Channel
            </Text>
          </Panel>
          <Panel verticalCenter={true} paddingVertical={15}>
            <Text category="h5">
              Now request the entrance of the visitor {visitor.name}
            </Text>
            <Text category="h6">
              It will be requested from resident {resident.name}
            </Text>
          </Panel>
          <Panel flexDirection="row">
            <Panel flex={1}>
              <CButton
                onPress={openCallPhone}
                paddingHorizontal={20}
                text="Call Phone"
              />
            </Panel>
            {resident.telegram !== "" && (
              <Panel flex={1}>
                <CButton
                  paddingHorizontal={20}
                  onPress={openTelegram}
                  text="Telegram"
                />
              </Panel>
            )}
          </Panel>
        </Panel>
      )}
      {confirmationSent && (
        <>
          <Panel horizontalCenter={true} paddingVertical={50}>
            <Text category="h4">Access was enabled?</Text>
          </Panel>
          <View style={styles.panelButtons}>
            <Panel flex={1}>
              <CButton
                paddingHorizontal={20}
                onPress={() => onConfirm(true)}
                text="Yes"
              />
            </Panel>
            <Panel flex={1}>
              <CButton
                paddingHorizontal={20}
                onPress={() => onConfirm(false)}
                text="Not"
              />
            </Panel>
          </View>
        </>
      )}
    </Panel>
  );
};
export default UserAccessRequest;
