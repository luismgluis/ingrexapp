import { StyleSheet, FlatList } from "react-native";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import Panel from "../Panel/Panel";
import { Text } from "@ui-kitten/components";
import UsersInfoListItem from "../UsersInfo/UsersInfoListItem";
import { ResidentAccess, ResidentType } from "../../../libs/types/ResidentType";
import utils from "../../../libs/utils/utils";
import api from "../../../libs/api/api";

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
  const [usersHistoryList, setUsersHistoryList] = useState<
    Array<ResidentAccess>
  >([]);

  useEffect(() => {
    api.residents
      .getAccessHistory()
      .then((data) => {
        setUsersHistoryList(data);
      })
      .catch(() => setUsersHistoryList([]));
  }, []);
  const renderItem = useCallback((data) => {
    //console.log(TAG, data);
    return (
      <UsersInfoListItem
        key={utils.generateKey("usersHistory")}
        resident={new ResidentType("", null)}
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
        {usersHistoryList.length === 0 && (
          <Panel paddingVertical={20}>
            <Text category="h5">- History is empty</Text>
          </Panel>
        )}
        <FlatList
          contentContainerStyle={styles.flatList}
          data={usersHistoryList}
          renderItem={(item) => renderItem(item.item)}
          keyExtractor={(item) => item.id}
          keyboardShouldPersistTaps="always"
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
          maxToRenderPerBatch={10}
        />
      </Panel>
    </Panel>
  );
};
export default UsersHistory;
