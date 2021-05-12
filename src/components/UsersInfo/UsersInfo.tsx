import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import React, { useMemo } from "react";
import Panel from "../Panel/Panel";
import { Avatar, Text } from "@ui-kitten/components";
import utils from "../../libs/utils/utils";

import CAvatar from "../CAvatar/CAvatar";
import { ResidentType } from "../../libs/types/ResidentType";
const styles = StyleSheet.create({
  container: {},
  panelProfile: {
    //flex: 1,
    flexDirection: "row",
  },
  panelProfileInfo: {
    paddingLeft: 10,
    flex: 1,
  },
  customTextTitle: { fontWeight: "700" },
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
};
const UsersInfo: React.FC<UsersInfoProps> = ({ style, resident }) => {
  const panelProfileStyles = {
    ...styles.panelProfile,
    ...utils.objects.cloneObject(style),
  };

  //<Avatar source={() => <DogIcon width={50} height={50} />} size="giant" />
  return (
    <Panel style={panelProfileStyles} level="6">
      <CAvatar urlImage={resident.profileImage} size={55} />
      <View style={styles.panelProfileInfo}>
        <Text category="h4">{resident.name}</Text>
        <Panel flexDirection="row">
          <CustomText
            title="Type"
            value={resident.isVisitor ? "Visitor" : "Resident"}
            flex={1}
          />
          {!resident.isVisitor && (
            <CustomText title="Sector" value={resident.sector} flex={1} />
          )}
        </Panel>
      </View>
    </Panel>
  );
};
export default UsersInfo;
