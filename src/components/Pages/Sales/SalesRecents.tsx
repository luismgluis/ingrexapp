import { Layout, Text } from "@ui-kitten/components";
import React from "react";
import { StyleSheet } from "react-native";
import ListItems, { ListItemDataType } from "../../UI/ListItems/ListItems";
const TAG = "SALES RECENTS";
const SalesRecents = () => {
  const newitem: ListItemDataType = {
    title: "Persona",
    key: "1",
    subTitle: "Algo por aqui",
    imageUri: "",
    icon: "corner-up-right",
    onPress: () => {},
  };
  return (
    <Layout>
      <Text style={styles.title} category="h5">
        Recents
      </Text>
      <ListItems data={[newitem]} />
    </Layout>
  );
};
const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontSize: 16,
  },
});
export default SalesRecents;
