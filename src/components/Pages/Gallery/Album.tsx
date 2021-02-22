import CameraRoll from "@react-native-community/cameraroll";
import { Layout, Text } from "@ui-kitten/components";
import React, { useEffect, useState, useCallback } from "react";
import { StyleSheet } from "react-native";
import Utils from "../../../libs/utils/utils";
import FeedImages, { FeedImageType } from "../../UI/FeedImages/FeedImages";
import CTopBack from "../../UI/CTopBack/CTopBack";

const Album = ({
  navigation,
  route,
  callBack = (data: FeedImageType) => {},
}) => {
  const [dataImages, setDataImages] = useState(Array<FeedImageType>());

  const defaultProps = {
    maxSize: 1,
    autoConvertPath: false,
    assetType: "Photos",
    groupTypes: "All",
  };
  const getData = useCallback(() => {
    //Platform.OS === "ios" ? defaultProps.groupTypes : undefined,
    CameraRoll.getPhotos({
      first: 1000000,
      groupTypes: "All",
      assetType: "Photos", //defaultProps.assetType,
    }).then((result) => {
      const arr = result.edges.map((item) => item.node);
      const dict = arr.reduce((prv, cur) => {
        const curValue = {
          type: cur.type,
          location: cur.location,
          timestamp: cur.timestamp,
          ...cur.image,
        };
        if (!prv[cur.group_name]) {
          prv[cur.group_name] = [curValue];
        } else {
          prv[cur.group_name].push(curValue);
        }
        return prv;
      }, {});
      const data = Object.keys(dict)
        .sort((a, b) => {
          const rootIndex = "Camera Roll";
          if (a === rootIndex) {
            return -1;
          } else if (b === rootIndex) {
            return 1;
          } else {
            return a < b ? -1 : 1;
          }
        })
        .map((key) => ({ name: key, value: dict[key] }));
      //this.setState({ data });
      if (!(data.length > 0)) {
        return;
      }

      const resultArr = Array<FeedImageType>();
      const parseFolder = (folder) => {
        const files = folder.value;
        for (const key in files) {
          if (!Object.hasOwnProperty.call(files, key)) {
            continue;
          }
          const file = files[key];
          resultArr.push(file);
        }
      };
      for (const key in data) {
        if (!Object.hasOwnProperty.call(data, key)) {
          continue;
        }
        const folder = data[key];
        parseFolder(folder);
      }

      function initialParseData(data): Array<FeedImageType> {
        let dataResult = Array<FeedImageType>();
        for (const key in data) {
          if (!Object.hasOwnProperty.call(data, key)) {
            continue;
          }
          const element = data[key];
          element.key = key;
          element.date = "";
          element.title = "";
          if (typeof element.timestamp !== "undefined") {
            element.title = Utils.dates.unixToString(element.timestamp, true);
          }
          if (typeof element.title == "undefined") {
            element.title = `item${key}`;
          }
          const newImageItem: FeedImageType = {
            key: key,
            uri: element.uri,
            title: element.title,
            timeStamp: element.timestamp,
            update: () => {},
            onPress: () => {
              callBack(newImageItem);
            },
          };
          dataResult.push(newImageItem);
        }
        return dataResult;
      }

      if (resultArr.length > 0) {
        const arr = initialParseData(resultArr);
        const ordenate = Utils.arrayOrderAsc(arr, "timeStamp");
        setDataImages(ordenate);
      }
    });
  }, []);
  useEffect(() => {
    getData();
  }, []);

  return (
    <Layout style={styles.container}>
      <CTopBack onBackPress={navigation.goBack} title={"Select an image"} />
      <FeedImages arrayImages={dataImages} />
    </Layout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 12,
  },
});
export default Album;
