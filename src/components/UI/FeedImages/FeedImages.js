import { Layout, Text } from "@ui-kitten/components";
import React, { useState } from "react";
import { Dimensions, FlatList, StyleSheet, View } from "react-native";
import Utils from "./../../../libs/utils/utils";
import SelectPerfil from "./../SelectPerfil/SelectPerfil";
const win = Dimensions.get("window");
let items = [];
let itemsO = [];

function initializeData() {
  let actualbox = [];
  for (let index = 0; index < 200; index++) {
    const theitem = {
      key: Utils.generateKey(`Feedkey${index}`),
      name: `box${index}`,
    };
    itemsO.push(theitem);
    actualbox.push(theitem);
    if (actualbox.length == 2) {
      items.push(actualbox);
      actualbox = [];
      continue;
    }
  }
  if (actualbox.length > 0) {
    items.push(actualbox);
    actualbox = [];
  }
}
initializeData();

const renderBox = (data) => {
  return (
    <View key={data.key} style={styles.box}>
      <Text key={`t${data.key}`} style={styles.title}>
        {data.name + "----"}
      </Text>
    </View>
  );
};
const renderItem = ({ item }) => {
  return renderBox(item);
};

const FeedImages = (props) => {
  return (
    <Layout style={styles.container}>
      <View style={styles.view1}>
        <SelectPerfil />
      </View>
      <View style={styles.view2}>
        <FlatList
          contentContainerStyle={{ margin: 4 }}
          horizontal={false}
          numColumns={3}
          data={itemsO}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
        />
      </View>
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: { flex: 12 },
  view1: {
    flex: 12,
    maxHeight: 50,
  },
  view2: { flex: 12 },
  content: { flex: 12 },
  box: {
    backgroundColor: "cyan",
    width: win.width / 3,
    height: win.width / 3,
  },
});
export default FeedImages;
