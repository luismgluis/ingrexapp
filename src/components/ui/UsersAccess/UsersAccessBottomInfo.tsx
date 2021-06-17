import { StyleSheet, View, StyleProp, ViewStyle } from "react-native";
import React, { useEffect, useState } from "react";
import CButton from "../CButton/CButton";

import { Text } from "@ui-kitten/components";
import Panel from "../Panel/Panel";
import UsersInfo from "../UsersInfo/UsersInfo";
import { ResidentAccess, ResidentType } from "../../../libs/types/ResidentType";
import { UserAccessModule } from "./UserAccessModule";
import utils from "../../../libs/utils/utils";

const styles = StyleSheet.create({
  container: { flex: 1 },
  panelOptions: {
    //height: 60,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    paddingTop: 10,
    paddingBottom: 5,
    position: "absolute",
    bottom: 0,
    alignSelf: "flex-end",
  },
  userInfoPanel: {
    width: "80%",
    alignSelf: "center",
    paddingTop: 10,
    paddingBottom: 10,
  },
  panelOptionsButton: {
    flex: 1,
    height: 50,
    alignItems: "center",
  },
  panelBottom: { bottom: 0 },
  lastAccessPanel: {
    alignItems: "flex-start",
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  panelSectorAction: { flexDirection: "row" },
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
const TAG = "USERS ACCESS BOTTOM INFO";
const module = new UserAccessModule();
type UsersAccessTopSearchProps = {
  style?: StyleProp<ViewStyle>;
  userResident: ResidentType;
  onClean: () => void;
};
const UsersAccessTopSearch: React.FC<UsersAccessTopSearchProps> = ({
  userResident,
  onClean,
}) => {
  const [lastEntryInfo, setLastEntryInfo] = useState(
    new ResidentAccess("", null),
  );
  const [lastEntryDate, setLastEntryDate] = useState("");

  useEffect(() => {
    console.log(TAG, "userResident get last access");
    userResident
      .getLastAccess()
      .then((res) => {
        console.log(TAG, res);
        const d = utils.dates.unixToString(res.creationDate, true);
        setLastEntryInfo(res);
        setLastEntryDate(d);
      })
      .catch((err) => {
        console.log(TAG, "get last access err", err);
        setLastEntryInfo(new ResidentAccess("", null));
        setLastEntryDate("");
      });
  }, [userResident]);

  const requestAccess = () => {
    module.getResidentConfirmation(userResident, (res) => {
      if (res) onClean();
    });
  };

  const saveExit = () => {
    module.saveExit(userResident);
    onClean();
  };

  return (
    <Panel level="6" style={styles.container}>
      <UsersInfo style={styles.userInfoPanel} resident={userResident} />
      <Panel level="6" style={styles.lastAccessPanel}>
        {!lastEntryInfo.isEmpty() && (
          <>
            <View style={styles.panelSectorAction}>
              <CustomText
                flex={1}
                title="Sector"
                value={lastEntryInfo.sector}
              />
              <CustomText
                flex={1}
                title="Action"
                value={lastEntryInfo.exit ? "Exit" : "Entry"}
              />
            </View>
            <CustomText title="Date" value={lastEntryDate} />
            <CustomText title="Comment" value={lastEntryInfo.comment} />
          </>
        )}
        {lastEntryInfo.isEmpty() && (
          <Panel horizontalCenter={true} paddingHorizontal={20}>
            <Text category="h6">Without last entry record</Text>
          </Panel>
        )}
      </Panel>
      <Panel level="7" style={styles.panelOptions}>
        <CButton
          text={"Exit"}
          onPress={() => saveExit()}
          style={styles.panelOptionsButton}
        />
        <CButton
          text={"Enter"}
          onPress={() => requestAccess()}
          style={styles.panelOptionsButton}
        />
      </Panel>
    </Panel>
  );
};
export default UsersAccessTopSearch;
