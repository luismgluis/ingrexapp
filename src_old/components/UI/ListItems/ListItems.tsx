import { Avatar, Button, Layout, ListItem, Text } from "@ui-kitten/components";
import React from "react";
import { FlatList, Image, StyleSheet, View } from "react-native";
import CButton, { CButtonStyleType } from "../CButton/CButton";
const TAG = "LIST ITEMS";

type ListItemsPropsType = {
  data: Array<ListItemDataType>;
};

type RenderItemPropsType = {
  data: ListItemDataType;
};
const RenderItem = ({ data }: RenderItemPropsType) => {
  const ItemImage = () => (
    <Avatar
      size=""
      source={{
        uri:
          "file:///data/user/0/com.mysoftdnd.ingrexapp/files/RNFetchBlobTmp_jqu10qk7ebpk6zmyxlc3e.jpg",
      }}
    />
  );

  const InstallButton = (props) => {
    return (
      <CButton
        icon={data.icon || "star"}
        type={data.iconType || "basic"}
        onlyIcon={true}
        size="small"
      />
    );
    //return <Button size="tiny">I</Button>;
  };

  return (
    <ListItem
      style={{ backgroundColor: "rgba(0, 0, 0, 0.0)" }}
      title={"" + data.title}
      description={"" + data.subTitle}
      accessoryLeft={ItemImage}
      accessoryRight={InstallButton}
    />
  );
};
const styles = StyleSheet.create({});
const ListItems = ({ data }: ListItemsPropsType) => {
  return (
    <View>
      <FlatList
        contentContainerStyle={{ margin: 4 }}
        horizontal={false}
        numColumns={1}
        initialNumToRender={7}
        data={data}
        renderItem={({ item }) => <RenderItem data={item} />}
        keyExtractor={(item) => item.key}
      />
    </View>
  );
};

export interface ListItemDataType {
  key: string;
  title: string;
  subTitle: string;
  imageUri: string;
  icon: string;
  iconType?:
    | "basic"
    | "primary"
    | "success"
    | "info"
    | "warning"
    | "danger"
    | "control";
  onPress: Function;
}

export default ListItems;
