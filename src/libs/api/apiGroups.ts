import { ChannelType } from "../types/ChannelType";
import firestore from "@react-native-firebase/firestore";
import ApiUsers from "./apiUsers";
import GroupType from "../types/GroupType";

const TAG = "API GROUPS";
class ApiGroup {
  currentGroup: string;
  apiUsers: ApiUsers;
  constructor() {
    this.apiUsers = new ApiUsers();
    this.currentGroup = "";

    /* */
  }
  getGroupByID(id: string): Promise<ChannelType> {
    return new Promise<ChannelType>((resolve, reject) => {
      try {
        const groupsCollection = firestore().collection("groups");
        groupsCollection
          .doc(id)
          .get()
          .then((res) => {
            const data: any = res.data();

            if (data !== null) {
              resolve(new ChannelType(id, data));
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
        .get()
        .then((res) => {
          const data: any = res.data();

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
                getFromFirebase(that.currentGroup, resolve, reject);
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
  joinGroup(groupID: string): Promise<boolean> {
    const that = this;
    const me = that.apiUsers.currentUser;
    const addGroupToMyGroups = (resolve, reject) => {
      const groupsCollection = firestore().collection("users_groups");
      const newField = {};
      newField[groupID] = 1;
      groupsCollection
        .doc(me.id)
        .set(newField)
        .then(() => resolve(true))
        .catch(() => reject(null));
    };
    const addMeToGroupUsers = (resolve, reject) => {
      const groupsCollection = firestore().collection("groups_users");
      const newField = {};
      newField[me.id] = 1;
      groupsCollection
        .doc(groupID)
        .set(newField)
        .then(() => addGroupToMyGroups(resolve, reject))
        .catch(() => reject(null));
    };
    return new Promise<boolean>((resolve, reject) => {
      try {
        that
          .getGroupByID(groupID)
          .then((group) => {
            if (!group.isEmpty()) {
              addMeToGroupUsers(resolve, reject);
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
}
export default ApiGroup;
