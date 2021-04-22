import { Divider, Layout, Text } from "@ui-kitten/components";
import React from "react";
import { FlatList, Pressable, StyleSheet, View } from "react-native";
import CSearch from "../CSearch/CSearch";
import ListItems, { ListItemDataType } from "../ListItems/ListItems";
const TAG = "GONDOLAS";
const RenderItem = ({ data }) => {
  return (
    <View style={styles.itemTopBox}>
      <Pressable>
        <Text style={styles.itemTopBoxText}>🤭</Text>
      </Pressable>
    </View>
  );
};
const Gondolas = () => {
  const list = Array<ListItemDataType>();
  for (let index = 0; index < 50; index++) {
    const newitem: ListItemDataType = {
      title: "Ttile" + index,
      key: "1" + index,
      subTitle: "More info" + index,
      imageUri: "",
      icon: "close",
      iconType: "info",
      onPress: () => {},
    };
    list.push(newitem);
  }
  return (
    <Layout level="2" style={styles.container}>
      <View style={styles.top}>
        <FlatList
          style={styles.flatList}
          contentContainerStyle={{ margin: 4 }}
          horizontal={true}
          numColumns={1}
          initialNumToRender={7}
          data={list}
          renderItem={({ item }) => <RenderItem data={item} />}
          keyExtractor={(item) => item.key}
        />
        <CSearch withCollapse={false} />
      </View>
      <View style={styles.body}>
        <ListItems data={list} />
      </View>
    </Layout>
  );
};
const styles = StyleSheet.create({
  container: { flex: 12, padding: 4 },
  flatList: { height: 45 },
  itemTopBox: {
    height: 40,
    width: 40,
    alignItems: "center",
    justifyContent: "center",
    borderRightWidth: 2,
    borderRightColor: "#EEEEEE",
    borderRadius: 6,
  },
  itemTopBoxText: {
    fontSize: 20,
  },
  top: {
    height: 90,
    //backgroundColor: "blue",
  },
  body: {
    //backgroundColor: "red",
    flex: 12,
  },
});
export default Gondolas;
