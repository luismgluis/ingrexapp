import AsyncStorage from "@react-native-async-storage/async-storage";
import UserType from "../types/UserType";
import auth from "@react-native-firebase/auth";
import firestore from "@react-native-firebase/firestore";
import utils from "../utils/utils";
import ApiStorage from "./apiStorage";

export interface getUserByIDPendingsCallBackType {
  ref?: string;
  callBack: (data: any, error: any) => void;
  execute: boolean;
  creationDate: number;
}

export interface getUserByIDPendingsType {
  uid: string;
  arrCallBacks: Array<getUserByIDPendingsCallBackType>;
}
const TAG = "API USERS";
class ApiUsers {
  storage: ApiStorage;
  currentUser: UserType;
  getUserByIDPendings: Array<getUserByIDPendingsType>;
  static instance: any;
  constructor() {
    if (typeof ApiUsers.instance === "object") {
      return ApiUsers.instance;
    }
    ApiUsers.instance = this;
    this.currentUser = new UserType("", { name: "" });
    this.getUserByIDPendings = [];
    this.storage = new ApiStorage();
    /* */
  }
  getUserByID(uid: string): Promise<UserType> {
    const that = this;
    const getUserFromLocal = (idUser, callBack: (res) => void) => {
      AsyncStorage.getItem(`getUserByID/${idUser}`)
        .then((res) => {
          if (res !== null) {
            callBack(JSON.parse(res));
            return;
          }
          callBack(null);
        })
        .catch((err) => {
          callBack(null);
          console.error(TAG, `getUserByID/${idUser} fail saved`, err);
        });
    };
    const getUserFromOnline = (idUser, callBack: (res) => void) => {
      firestore()
        .collection("users")
        .doc(uid)
        .get()
        .then((data) => {
          if (data !== null) {
            callBack(data.data());
            return;
          }
          callBack(null);
        })
        .catch((err) => {
          console.error(TAG, `getUserByID/${idUser} fail saved`, err);
          callBack(null);
        });
    };
    const checkPending = (idUser: string, resolve, reject): boolean => {
      const peds = that.getUserByIDPendings;

      const addPending = (userPending: getUserByIDPendingsType) => {
        userPending.arrCallBacks.push({
          creationDate: utils.dates.dateNowUnix(),
          execute: false,
          callBack: (data, error) => {
            if (error !== null) {
              reject(error);
              return;
            }
            if (data !== null) {
              resolve(data);
              return;
            }
            reject(null);
          },
        });
      };

      const hasUser = utils.objects.arrayHasObjectChildEqualTo(
        peds,
        "uid",
        idUser,
      );
      if (hasUser.isEqual) {
        const userPending = <getUserByIDPendingsType>hasUser.item;
        const hasPending = utils.objects.arrayHasObjectChildEqualTo(
          userPending.arrCallBacks,
          "execute",
          false,
        );
        if (hasPending.isEqual) {
          addPending(userPending);
          return true;
        }
        return false;
      }
      const newUserPending = {
        uid: idUser,
        arrCallBacks: [],
      };
      peds.push(newUserPending);
      return false;
    };
    const resolvePendings = (idUser: string, resolve, reject) => {
      const peds = that.getUserByIDPendings;
      const hasUser = utils.objects.arrayHasObjectChildEqualTo(
        peds,
        "uid",
        idUser,
      );
      if (hasUser.isEqual) {
        const userPending = <getUserByIDPendingsType>hasUser.item;
        userPending.arrCallBacks.forEach((data) => {
          if (!data.execute) {
            data.execute = true;
            data.callBack(resolve, reject);
          }
        });
      }
    };
    return new Promise<UserType>((resolve, reject) => {
      try {
        if (!checkPending(uid, resolve, reject)) {
          getUserFromLocal(uid, (resLocal) => {
            if (resLocal !== null) {
              const newuser = new UserType(uid, resLocal);
              if (!newuser.isEmpty()) {
                resolve(newuser);
                resolvePendings(uid, newuser, null);
                return;
              }
            }
            getUserFromOnline(uid, (resOnline) => {
              if (resOnline !== null) {
                const newuser = new UserType(uid, resOnline);
                resolve(newuser);
                resolvePendings(uid, newuser, null);
                AsyncStorage.setItem(
                  `getUserByID/${uid}`,
                  JSON.stringify({
                    ...utils.objects.cloneObject(newuser),
                    localSaveCreationDate: utils.dates.dateNowUnix(),
                  }),
                );
                return;
              }
              reject(null);
              resolvePendings(uid, null, "Fail to getUserFromOnline");
            });
          });
        }
      } catch (error) {
        reject(null);
        resolvePendings(uid, null, "Fail to getUserFrom...");
      }
    });
  }
  getUserByEmail(email: string): Promise<UserType> {
    const that = this;

    const getUserFromOnline = (callBack: (id, res) => void) => {
      firestore()
        .collection("users")
        .where("email", "==", email)
        .get()
        .then((docs) => {
          if (docs !== null) {
            for (const key in docs.docs) {
              const doc = docs.docs[key];
              callBack(doc.id, doc.data());
              return;
            }
          }
          callBack(null, null);
        })
        .catch((err) => {
          console.error(TAG, `getUserByEmail/${email}`, err);
          callBack(null, null);
        });
    };
    return new Promise<UserType>((resolve, reject) => {
      try {
        getUserFromOnline((id, res = null) => {
          if (res !== null) {
            const user = new UserType(id, res);
            resolve(user);
            return;
          }
          resolve(null);
        });
      } catch (error) {
        reject(null);
      }
    });
  }
  saveUser(user: UserType): Promise<void> {
    const profileImageUri = user.profileImage;
    user.profileImage = "";
    this.storage.saveFile(
      `/users/${user.id}/profileImage`,
      profileImageUri,
      (p) => {
        console.log(TAG, "progress upload", p);
      },
      (uri) => {
        firestore()
          .collection("users")
          .doc(user.id)
          .update({ profileImage: uri });
      },
    );
    return firestore().collection("users").doc(user.id).set(user);
  }
  onCurrentUserUpdate(onUpdate: (user: UserType) => void): () => void {
    const that = this;
    const unsubs = auth().onAuthStateChanged((me) => {
      if (me == null) {
        that.currentUser = new UserType("", {});
        onUpdate(that.currentUser);
        return;
      }
      that
        .getUserByID(me.uid)
        .then((data) => {
          that.currentUser = data;
          onUpdate(that.currentUser);
        })
        .catch((err) => {
          console.error(TAG, err);
          that.currentUser = new UserType("", {});
          onUpdate(that.currentUser);
        });
    });
    return unsubs;
  }
}
export default ApiUsers;
