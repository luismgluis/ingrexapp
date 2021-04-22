import { StyleSheet, View, Pressable } from "react-native";
import React, { useEffect, useMemo, useState } from "react";
import { Button, useTheme } from "@ui-kitten/components";
import utils from "./../../libs/utils/utils";
import { ChannelType } from "../../libs/types/ChannelType";
import { ChannelsListItem } from "./ListChannels";
import CameraIcon from "./../Icons/others/CameraICon";
import MapIcon from "../Icons/Home/MapIcon";
import CButton from "../CButton/CButton";
const styles = StyleSheet.create({
  itemBox: {
    paddingHorizontal: 5,
    paddingVertical: 0,
  },
});

const TAG = "LIST CHANNEL ITEM";
type ListChannelItemProps = {
  listItem: ChannelsListItem;
  underline?: boolean;
  onPress: (channelID: ChannelsListItem) => void;
};
const ListChannelItem: React.FC<ListChannelItemProps> = ({
  listItem,
  underline = false,
  onPress,
}) => {
  const [visible, setVisible] = useState(true);
  const theme = useTheme();

  const pressItem = () => {
    onPress(listItem);
  };

  const stylesBox = {
    ...styles.itemBox,
    borderBottomWidth: undefined,
    borderBottomColor: undefined,
  };
  if (underline) {
    stylesBox.borderBottomWidth = 3;
    stylesBox.borderBottomColor = theme["color-primary-600"];
  }
  return (
    <View key={utils.generateKey("channelItem")} style={stylesBox}>
      {visible && (
        <>
          {listItem.withIcon && (
            <CButton
              onPress={pressItem}
              imageInsertComponent={() => (
                <MapIcon
                  color={theme["color-primary-500"]}
                  width={35}
                  height={35}
                />
              )}
            />
          )}
          {!listItem.withIcon && (
            <Button onPress={pressItem} size="medium" appearance="ghost">
              {listItem.channel?.name}
            </Button>
          )}
        </>
      )}
    </View>
  );
};
export default ListChannelItem;
