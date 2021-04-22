import { Text } from "@ui-kitten/components";
import React from "react";
import api from "../../libs/api/api";
import { ChannelType } from "../../libs/types/ChannelType";
import GroupType from "../../libs/types/GroupType";
import utils from "../../libs/utils/utils";
import { CAlertEmpty, CAlertQuestion } from "../CAlert/CAlertNotification";
import CButton from "../CButton/CButton";
import DoneDealIcon from "../Icons/others/DoneDealIcon";
import TeamIcon from "../Icons/others/TeamIcon";
import JoinGroup from "../JoinGroup/JoinGroup";
import Panel from "../Panel/Panel";
import CInput from "./../CInput/CInput";
const TAG = "HOME MODULE";

export type ChannelsListItem = {
  key: string;
  index: number;
  withIcon: boolean;
  module: "camera" | "map" | "channel";
  channel?: ChannelType;
};

export default class HomeModule {
  theme: Array<any>;
  constructor(theme) {
    this.theme = theme;
  }
  alertJoinToGroup(callBack: (data) => void): void {
    const that = this;
    const alert = CAlertQuestion(
      "Hello",
      "it seems that you still do not belong to a group",
      <TeamIcon
        width={150}
        height={150}
        color={that.theme["color-primary-500"]}
      />,
      {
        text: "Join a group",
        onPress: () => onPressJoin(),
      },
      {
        text: "Create group",
        onPress: () => that.createGroup(callBack),
      },
      {
        text: "Back to login",
        onPress: () => {
          api.logOut();
          alert.close();
        },
      },
    );
    const onPressJoin = () => {
      that.joinGroup((data) => {
        if (data == null) {
          callBack(null);
          return;
        }
        that.confirmJoinToGroup(data, (res) => {
          console.log(TAG, res);
          if (res) callBack(data);
          if (!res) alert.show();
        });
      });
    };
  }
  confirmJoinToGroup(
    group: GroupType,
    callBack: (result: boolean) => void,
  ): void {
    const that = this;
    const alert = CAlertQuestion(
      `Are sure to join to ${group.name}`,
      `Created at: ${utils.dates.unixToString(group.creationDate)}`,
      <DoneDealIcon
        width={150}
        height={150}
        color={that.theme["color-primary-500"]}
        colorTwo={that.theme["color-primary-300"]}
      />,
      {
        text: "Join",
        onPress: () => {
          api.group
            .joinGroup(group.id)
            .then((res) => {
              if (res) callBack(true);
              if (!res) callBack(false);
            })
            .catch(() => callBack(false));
        },
      },
      {
        text: "Cancel",
        onPress: () => callBack(false),
      },
    );
  }
  joinGroup(callBack: (data: GroupType) => void): void {
    CAlertEmpty(
      <>
        <JoinGroup callBack={callBack} />
      </>,
    );
  }
  createGroup(callBack: (data) => void): void {
    CAlertEmpty(
      <>
        <Text>gogo create group</Text>
        <CButton text="close" onPress={() => callBack(null)} />
      </>,
    );
  }
  getChannels(callBack: (data: Array<ChannelsListItem>) => void): void {
    api.group
      .getChannelsList()
      .then((data) => {
        if (data == null) {
          callBack([]);
          //onChange(null);
          return;
        }
        const newData = [];
        newData.unshift({
          index: 0,
          key: "{MAP-MODULE}",
          withIcon: true,
          module: "map",
        });
        let index = 0;
        const newMapData: Array<ChannelsListItem> = data.map((channel) => ({
          index: ++index,
          key: channel.chatRoomID,
          withIcon: false,
          channel: channel,
          module: "channel",
        }));

        newData.push(...newMapData);
        callBack(newData);
      })
      .catch((err) => {
        console.error(TAG, err);
        callBack([]);
      });
  }
}
