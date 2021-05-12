import { StyleSheet, View, StyleProp, ViewStyle, FlatList } from "react-native";
import React, { useCallback, useEffect, useMemo } from "react";
import Panel from "../Panel/Panel";
import { Text } from "@ui-kitten/components";
import CInput from "../CInput/CInput";
import UsersInfoListItem from "../UsersInfo/UsersInfoListItem";
import { ResidentType } from "../../libs/types/ResidentType";

const styles = StyleSheet.create({
  container: {},
  flatList: { paddingVertical: 10 },
  panel: {
    flex: 1,
    width: "80%",
    backgroundColor: "red",
    height: 50,
  },

  panelTitle: {
    borderBottomLeftRadius: 12,
    borderBottomRightRadius: 12,
    paddingVertical: 5,
    paddingHorizontal: 20,
  },
  panelFlatList: { width: "90%" },
});
const TAG = "USERS HISTORY";
type UsersHistoryProps = {
  pagerFocus?: boolean;
};
const UsersHistory: React.FC<UsersHistoryProps> = ({ pagerFocus }) => {
  const usersHistoryList = useMemo(() => {
    let counter = 0;
    const arr = [];
    while (counter < 100) {
      arr.push(counter);
      counter++;
    }
    return arr;
  }, []);
  const renderItem = useCallback((data) => {
    //console.log(TAG, data);
    return (
      <UsersInfoListItem
        resident={new ResidentType("", {})}
        footerText="10/04/2021 13:50"
      />
    );
  }, []);
  return (
    <Panel horizontalCenter={true} style={styles.container}>
      <Panel style={styles.panelTitle} level="6">
        <Text category="h3">Access History</Text>
      </Panel>
      <Panel style={styles.panelFlatList}>
        <FlatList
          contentContainerStyle={styles.flatList}
          data={usersHistoryList}
          renderItem={(item) => renderItem(item.item)}
          keyExtractor={(item) => item.index}
          keyboardShouldPersistTaps="always"
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          maxToRenderPerBatch={10}
        />
      </Panel>
    </Panel>
  );
};
export default UsersHistory;
