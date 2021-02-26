import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import ListItems, { ListItemDataType } from "../../UI/ListItems/ListItems";
const TAG = "SALES CAR LIST";
const SalesCarList = () => {
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
    <Layout>
      <Text style={styles.title} category="h5">
        Car List
      </Text>
      <ListItems data={list} />
    </Layout>
  );
};
const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 16,
  },
});
export default SalesCarList;
