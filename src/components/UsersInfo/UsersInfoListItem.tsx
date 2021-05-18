import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import React from "react";
import Panel from "../Panel/Panel";
import { Avatar, Button, Icon, Text, useTheme } from "@ui-kitten/components";
import utils from "../../libs/utils/utils";
import { ThemeProvider } from "@react-navigation/native";
import { ResidentType } from "../../libs/types/ResidentType";
import CAvatar from "../CAvatar/CAvatar";
import CButton from "../CButton/CButton";
import CloseIcon from "../Icons/others/CloseIcon";
import CheckIcon from "../Icons/others/CheckIcon";

const styles = StyleSheet.create({
  container: {},
  panelProfile: {
    flexDirection: "row",
    paddingVertical: 10,
    borderBottomWidth: 2,
    paddingHorizontal: 20,
  },
  panelProfileInfo: {
    paddingLeft: 15,
    flex: 1,
  },
  customTextTitle: { fontWeight: "700" },
  buttonPanel: { borderRadius: 12 },
});

const CustomText: React.FC<any> = ({ title = "", value = "", flex = null }) => {
  const customStyle = { flex: flex ? 1 : undefined };
  return (
    <Text style={customStyle} category="h6">
      <Text style={styles.customTextTitle} category="h6">
        {title + ":"}
      </Text>{" "}
      {value}
    </Text>
  );
};

const TAG = "USERS INFO";
type UsersInfoProps = {
  style?: StyleProp<ViewStyle>;
  resident: ResidentType;
  footerText?: string;
  onPress?: (resi: ResidentType) => void;
};
const UsersInfoListItem: React.FC<UsersInfoProps> = ({
  style,
  resident,
  footerText = "",
  onPress = null,
}) => {
  const theme = useTheme();
  const panelProfileStyles = {
    ...styles.panelProfile,
    ...utils.objects.cloneObject(style),
    borderBottomColor: theme["color-basic-500"],
  };
  if (resident.isEmpty()) return <></>;

  return (
    <Panel style={panelProfileStyles} level="5">
      <CAvatar urlImage={resident.profileImage} size={55} />
      <Panel style={styles.panelProfileInfo}>
        <Text category="h4">{resident.name}</Text>
        <Panel flexDirection="row">
          <CustomText
            title="Type"
            value={resident.isVisitor ? "Visitor" : "Resident"}
            flex={1}
          />
          <CustomText title="Sector" value={resident.sector} flex={1} />
          {footerText !== "" && <Text category="label">{footerText}</Text>}
        </Panel>
      </Panel>
      {onPress !== null && (
        <Panel paddingHorizontal={10} level="7" style={styles.buttonPanel}>
          <CButton
            onPress={() => {
              if (onPress) onPress(resident);
            }}
            imageInsertComponent={() => (
              <CheckIcon
                color={theme["color-primary-500"]}
                width={30}
                height={30}
              />
            )}
          />
        </Panel>
      )}
    </Panel>
  );
};
export default UsersInfoListItem;
