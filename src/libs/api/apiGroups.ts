import { ChannelType } from "../types/ChannelType";
import firestore from "@react-native-firebase/firestore";
import ApiUsers from "./apiUsers";
import GroupType from "../types/GroupType";
import utils from "../utils/utils";
import UserType from "../types/UserType";

const TAG = "API GROUPS";
class ApiGroup {
  currentGroup: string;
  currentGroupData: GroupType;
  apiUsers: ApiUsers;
  static instance: any;
  constructor() {
    if (typeof ApiGroup.instance === "object") {
      return ApiGroup.instance;
    }
    ApiGroup.instance = this;
    this.apiUsers = new ApiUsers();
    this.currentGroup = "";
    this.currentGroupData = new GroupType("", {});
    /* */
  }
  getGroupByID(id: string): Promise<GroupType> {
    return new Promise<GroupType>((resolve, reject) => {
      try {
        const groupsCollection = firestore().collection("groups");
        groupsCollection
          .doc(id)
          .get()
          .then((res) => {
            const data: any = res.data();

            if (data !== null) {
              resolve(new GroupType(id, data));
              return;
            }
            reject(null);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  getGroupsListtsts(uid = ""): Promise<Array<ChannelType>> {
    const that = this;
    if (uid === "") {
      uid = that.apiUsers.currentUser.id;
    }
    function getFromFirebase(resolve, reject) {
      const channelsCollection = firestore().collection("users_groups");
      channelsCollection
        .doc(that.currentGroup)
        .get()
        .then((res) => {
          const data = res.data();

          if (data !== null) {
            const arr = Array<ChannelType>();
            for (const key in data) {
              if (!Object.prototype.hasOwnProperty.call(data, key)) {
                return;
              }
              const element = data[key];
              arr.push(new ChannelType(key, element));
            }
            resolve(arr);
          }
          reject(null);
        })
        .catch((err) => {
          reject(err);
        });
    }
    return new Promise<Array<ChannelType>>((resolve, reject) => {
      try {
        getFromFirebase(resolve, reject);
      } catch (error) {
        reject(null);
      }
    });
  }
  getUserGroups(uid = ""): Promise<Array<string>> {
    const that = this;
    if (uid === "") {
      uid = that.apiUsers.currentUser.id;
    }
    return new Promise<Array<string>>((resolve, reject) => {
      try {
        const groupsCollection = firestore().collection("users_groups");
        groupsCollection
          .doc(uid)
          .get()
          .then((res) => {
            const data = res.data();
            if (data == null) {
              resolve([]);
              return;
            }
            resolve(Object.keys(data));
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  getChannelsList(uid = "", group = ""): Promise<Array<ChannelType>> {
    const that = this;
    if (uid === "") {
      uid = that.apiUsers.currentUser.id;
    }

    function getFromFirebase(groupId, resolve, reject) {
      const channelsCollection = firestore().collection("groups_channels");
      channelsCollection
        .doc(groupId)
        .collection("channels")
        .get()
        .then((res) => {
          const arr = Array<ChannelType>();
          if (res !== null) {
            res.forEach((doc) => {
              arr.push(new ChannelType(doc.id, doc.data()));
            });
            resolve(arr);
            return;
          }
          reject(null);
        })
        .catch((err) => {
          console.error(TAG, "fail to get groups", err);
          reject(err);
        });
    }
    return new Promise<Array<ChannelType>>((resolve, reject) => {
      try {
        if (group === "") {
          if (that.currentGroup === "") {
            that.getUserGroups(uid).then((channelsList) => {
              if (channelsList.length > 0) {
                that.currentGroup = channelsList[0];
                that
                  .getGroupByID(that.currentGroup)
                  .then((groupData) => {
                    that.currentGroupData = groupData;
                    getFromFirebase(that.currentGroup, resolve, reject);
                  })
                  .catch((err) => {
                    reject(err);
                  });
                return;
              }
              resolve(null);
            });
            return;
          }
          group = that.currentGroup;
        }
        getFromFirebase(group, resolve, reject);
      } catch (error) {
        reject(null);
      }
    });
  }
  searchGroupByAt(at: string): Promise<GroupType[]> {
    return new Promise<GroupType[]>((resolve, reject) => {
      try {
        const groupsCollection = firestore().collection("groups");
        groupsCollection
          .where("at", "==", at)
          .limit(1)
          .get()
          .then((res) => {
            const data: GroupType[] = [];
            if (res == null) {
              resolve(data);
              return;
            }
            res.forEach((doc) => data.push(new GroupType(doc.id, doc.data())));
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  addChannelToMyGroup(
    me: UserType,
    groupID: string,
    name: string,
  ): Promise<ChannelType> {
    console.log(TAG, "addcahnnel");
    const groupsCollection = firestore().collection("groups_channels");

    const groupsChatRoomsCollection = firestore().collection(
      "groups_chat_rooms",
    );
    const newChatRoom = groupsChatRoomsCollection.doc();
    groupsChatRoomsCollection.doc(newChatRoom.id).set({ groupID: groupID });

    const newChannel = new ChannelType(newChatRoom.id, null, {
      id: newChatRoom.id,
      chatRoomID: newChatRoom.id,
      creationDate: utils.dates.dateNowUnix(),
      name: name,
      onlyAdmins: false,
      creator: me.id,
    });

    return new Promise<ChannelType>((resolve, reject) => {
      try {
        const data = newChannel.exportToUpload();
        groupsCollection
          .doc(groupID)
          .collection("channels")
          .add(data)
          .then(() => {
            console.log(TAG, "yes");
            resolve(newChannel);
          })
          .catch((err) => {
            console.log(TAG, "fail");
            reject(err);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  addGroupToMyGroups(me: UserType, groupID: string, resolve, reject): void {
    const groupsCollection = firestore().collection("users_groups");
    const newField = {};
    newField[groupID] = 1;
    groupsCollection
      .doc(me.id)
      .set(newField)
      .then(() => resolve(true))
      .catch((err) => reject(err));
  }
  addMeToGroupUsers(me: UserType, groupID: string): Promise<void> {
    const groupsCollection = firestore().collection("groups_users");
    const newField = {};
    newField[me.id] = 1;
    return groupsCollection.doc(groupID).set(newField);
  }
  joinGroup(groupID: string): Promise<boolean> {
    const that = this;
    const me = that.apiUsers.currentUser;

    return new Promise<boolean>((resolve, reject) => {
      try {
        console.log(TAG, "joinGroup", groupID);
        that
          .getGroupByID(groupID)
          .then((group) => {
            if (!group.isEmpty()) {
              that
                .addMeToGroupUsers(me, groupID)
                .then(() =>
                  that.addGroupToMyGroups(me, groupID, resolve, reject),
                )
                .catch((err) => {
                  console.log(TAG, "fail to join group", err);
                  reject(err);
                });
              return;
            }
            reject(null);
          })
          .catch(() => reject(null));
      } catch (error) {
        reject(null);
      }
    });
  }
  createGroup(group: GroupType): Promise<GroupType> {
    const that = this;
    const me = that.apiUsers.currentUser;

    const addNewGroup = (data: GroupType, resolve, reject) => {
      const groupsCollection = firestore().collection("groups");
      const newGroup = groupsCollection.doc();
      const completeCreation = async () => {
        await that.addMeToGroupUsers(me, newGroup.id);
        await that.addChannelToMyGroup(me, newGroup.id, "General");
        that.addGroupToMyGroups(
          me,
          newGroup.id,
          (res) => {
            if (res) {
              resolve(data);
              return;
            }
            reject(null);
          },
          (err) => {
            console.log(TAG, err);
            reject(err);
          },
        );
      };
      groupsCollection
        .doc(newGroup.id)
        .set(data)
        .then(() => completeCreation())
        .catch((err) => reject(err));
    };
    return new Promise<GroupType>((resolve, reject) => {
      try {
        const newGroup = new GroupType("", {
          ...group,
          admins: [me.id],
          creationDate: utils.dates.dateNowUnix(),
          creator: me.id,
        });
        addNewGroup(newGroup, resolve, reject);
      } catch (error) {
        reject(null);
      }
    });
  }
}
export default ApiGroup;
