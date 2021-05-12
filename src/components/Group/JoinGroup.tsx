import { StyleSheet, StyleProp, ViewStyle } from "react-native";
import React, { useState } from "react";
import Panel from "../Panel/Panel";
import { Text } from "@ui-kitten/components";
import CInput from "../CInput/CInput";
import CButton from "../CButton/CButton";
import api from "../../libs/api/api";
import LoadingPanel from "../LoadingPanel/LoadingPanel";
import GroupType from "../../libs/types/GroupType";

const styles = StyleSheet.create({ container: {} });

const TAG = "JOIN GROUP";
type JoinGroupProps = {
  style?: StyleProp<ViewStyle>;
  callBack: (data: GroupType) => void;
};
const JoinGroup: React.FC<JoinGroupProps> = ({ style, callBack }) => {
  const [groupText, setGroupText] = useState("");
  const [loading, setLoading] = useState(false);
  const onSearch = (at: string) => {
    setLoading(true);
    api.group
      .searchGroupByAt(at.replace(" ", "").replace("@", ""))
      .then((res) => {
        if (res.length > 0) {
          callBack(res[0]);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(TAG, "err", err);
      });
  };
  return (
    <Panel verticalCenter={true} horizontalCenter={true} paddingHorizontal={50}>
      <Text category="h3">Join a group</Text>
      <Text category="h6">write the group at</Text>
      <CInput
        value={groupText}
        onChangeText={(t) => setGroupText(t)}
        placeholder="@business123"
        label="At :"
        paddingVertical={30}
        caption="You can join '@global' or another group you know the name."
      />
      {!loading && (
        <>
          <CButton text="Search" onPress={() => onSearch(groupText)} />
          <CButton
            text="Back"
            appeareance="ghost"
            paddingVertical={10}
            onPress={() => callBack(null)}
          />
        </>
      )}
      {loading && <LoadingPanel text="Searching groups..." />}
    </Panel>
  );
};
export default JoinGroup;
