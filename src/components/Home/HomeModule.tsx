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
import JoinGroup from "../Group/JoinGroup";
import Panel from "../Panel/Panel";
import CInput from "./../CInput/CInput";
import CreateGroup from "../Group/CreateGroup";
const TAG = "HOME MODULE";

export type ChannelsListItem = {
  key: string;
  index: number;
  withIcon: boolean;
  module: "access" | "history" | "register" | "channel";
  channel?: ChannelType;
};

export default class HomeModule {
  theme: Array<any>;
  currentAlert: any;
  constructor(theme) {
    this.theme = theme;
    this.currentAlert = null;
  }
  alertJoinToGroup(
    callBack: (data: GroupType) => void,
    firsTime: boolean,
  ): void {
    const that = this;
    const alert = CAlertQuestion(
      "Hello",
      firsTime
        ? "it seems that you still do not belong to a group"
        : "Do you want to change group?",
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
      null,
      firsTime,
    );
    that.currentAlert = alert;
    const onPressJoin = () => {
      that.joinGroup((data) => {
        if (data == null) {
          callBack(null);
          return;
        }
        that.confirmJoinToGroup(data, (res) => {
          console.log(TAG, res);
          if (res) callBack(data);
          if (!res) {
            alert.show();
            that.currentAlert = alert;
          }
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
    that.currentAlert = alert;
  }
  joinGroup(callBack: (data: GroupType) => void): void {
    const that = this;
    const alert = CAlertEmpty(
      <>
        <JoinGroup callBack={callBack} />
      </>,
    );
    that.currentAlert = alert;
  }
  createGroup(callBack: (data: GroupType) => void): void {
    const that = this;
    const alert = CAlertEmpty(
      <>
        <CreateGroup callBack={(data) => callBack(data)} />
      </>,
    );
    that.currentAlert = alert;
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

        let index = -1;
        const newData = [];
        newData.push({
          index: ++index,
          key: "{ACCESS-MODULE}",
          withIcon: true,
          module: "access",
        });
        newData.push({
          index: ++index,
          key: "{HISTORY-MODULE}",
          withIcon: true,
          module: "history",
        });
        newData.push({
          index: ++index,
          key: "{REGISTER-MODULE}",
          withIcon: true,
          module: "register",
        });

        const newMapData: Array<ChannelsListItem> = data.map((channel) => ({
          index: ++index,
          key: channel.chatRoomID,
          withIcon: false,
          channel: channel,
          module: "channel",
        }));
        console.log(TAG, newData);
        newData.push(...newMapData);
        callBack(newData);
      })
      .catch((err) => {
        console.error(TAG, err);
        callBack([]);
      });
  }
  closeCurrentAlert(): void {
    this.currentAlert?.close();
  }
}
