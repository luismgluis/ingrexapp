import { Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Pressable,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";
import { color } from "react-native-reanimated";
import Utils from "../../../libs/utils/utils";
import SelectPerfil from "../SelectPerfil/SelectPerfil";

const TAG = "FEED IMAGES";

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
function initialParseData(data) {
  let dataResult = [];
  for (const key in data) {
    if (!Object.hasOwnProperty.call(data, key)) {
      continue;
    }
    const element = data[key];
    element.key = key;
    element.date = "";
    if (typeof element.timestamp !== "undefined") {
      element.name = Utils.dates.unixToString(element.timestamp, true);
    }
    if (typeof element.name == "undefined") {
      element.name = `item${key}`;
    }
    dataResult.push(element);
  }
  return dataResult;
}

const RenderItem = ({ item }) => {
  const datao: FeedImageType = item;
  const [data, setData] = useState(datao);
  const theKey = Utils.generateKey(`feedimages${data.key}`);
  if (typeof data.uri == "undefined") {
    return <></>;
  }

  useEffect(() => {
    data.update((result: FeedImageType) => {
      if (result !== null) {
        console.log(TAG, "--UPDATEEE--", result);
        setData(result);
      }
    });
  }, []);

  return (
    <Pressable
      onPress={() => {
        data.onPress(data);
      }}>
      <View key={theKey} style={styles.box}>
        <Image style={styles.boxImage} source={{ uri: data.uri }}></Image>
        <Text category="s1" key={`t_${theKey}`} style={styles.boxTitle}>
          {data.title}
        </Text>
      </View>
    </Pressable>
  );
};
interface FeedProps {
  arrayImages: Array<FeedImageType>;
}
const FeedImages = ({ arrayImages }: FeedProps) => {
  console.log("itemsO");
  return (
    <Layout style={styles.container}>
      <View style={styles.view1}>
        <SelectPerfil searchEnabledOrg={true} />
      </View>
      <View style={styles.view2}>
        <FlatList
          contentContainerStyle={{ margin: 4 }}
          horizontal={false}
          numColumns={3}
          data={arrayImages}
          renderItem={({ item }) => <RenderItem item={item} />}
          keyExtractor={(item) => item.key}
        />
      </View>
    </Layout>
  );
};
const marginXbox = 2;
const styles = StyleSheet.create({
  container: { flex: 12 },
  view1: {
    flex: 12,
    maxHeight: 50,
  },
  view2: { flex: 12 },
  content: { flex: 12 },
  box: {
    backgroundColor: "gray",
    width: win.width / 3 - marginXbox - 2,
    height: win.width / 3,
    borderRadius: 4,
    overflow: "hidden",
    marginTop: marginXbox,
    marginRight: marginXbox,
  },
  boxImage: {
    flex: 1,
    width: win.width / 3,
    height: win.width / 3,
  },
  boxTitle: {
    position: "absolute",
    bottom: 0,
    color: "white",
    width: "100%",
    backgroundColor: "#0000005e",
    paddingHorizontal: 5,
  },
});
export default FeedImages;

export interface FeedImageType {
  key: string;
  uri: string;
  title: string;
  timeStamp: number;
  update: Function;
  onPress: Function;
}
