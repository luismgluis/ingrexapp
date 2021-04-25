import { StyleSheet, View, StyleProp, ViewStyle, FlatList } from "react-native";
import React, { useCallback, useEffect, useMemo } from "react";
import Panel from "../Panel/Panel";
import { Text } from "@ui-kitten/components";
import CInput from "../CInput/CInput";
import UsersInfoListItem from "../UsersInfo/UsersInfoListItem";

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
    console.log(TAG, data);
    return (
      <UsersInfoListItem
        title="Luis Miguel Grajales"
        description={`Access to F204 = ${data}`}
        footerText="10/04/2021 13:50"
        imageUri="https://firebasestorage.googleapis.com/v0/b/ingrex-app.appspot.com/o/others%2Fluismiguel_tatacoa.jpg?alt=media&token=d23abb8f-ea5a-4bab-9525-7c647a063079"
      />
    );
  }, []);
  return (
    <Panel horizontalCenter={true} style={styles.container}>
      <Panel style={styles.panelTitle} level="6">
        <Text category="h3">Access History</Text>
      </Panel>
      <Panel>
        <FlatList
          contentContainerStyle={styles.flatList}
          data={usersHistoryList}
          renderItem={(item) => renderItem(item.item)}
          keyExtractor={(item) => item.index}
          keyboardShouldPersistTaps="always"
          viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        />
      </Panel>
    </Panel>
  );
};
export default UsersHistory;
