import { ResidentType } from "../types/ResidentType";
import firestore from "@react-native-firebase/firestore";
import ApiGroup from "./apiGroups";
import { ResidentAccess } from "./../types/ResidentType";
import ApiStorage from "./apiStorage";
import utils from "../utils/utils";
import axios from "axios";
import { TelegramUsersReplies } from "../types/TelegramUsers";
const TAG = "API RESIDENTS";

export type callBackStop = {
  setCallBack: (callBack: (result: TelegramUsersReplies) => void) => void;
  stopListener: () => void;
};

export class ApiResidents {
  group: ApiGroup;
  storage: ApiStorage;
  constructor() {
    this.storage = new ApiStorage();
    this.group = new ApiGroup();
    //
  }
  getTelegram(resi: ResidentType): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      try {
        firestore()
          .collection("telegram_users")
          .where("sector", "==", resi.sector)
          .where("idCard", "==", resi.idCard)
          .limit(1)
          .get()
          .then((data) => {
            console.log(TAG, data);
            const arrData: any = [];
            data.forEach((doc) => {
              console.log(TAG, doc.data());
              const telegramInfo = {
                ...doc.data(),
                id: doc.id,
              };
              arrData.push(telegramInfo);
            });
            if (arrData.length > 0) {
              resolve(arrData[0]);
              return;
            }
            reject(null);
          })
          .catch((err) => {
            console.log(TAG, err);
            reject(null);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  sendTelegramMessage(
    resi: ResidentType,
    msj: string,
    replyOptions: Array<string>,
  ): Promise<callBackStop> {
    const that = this;
    let telegramInfo = <any>{};
    const arrReplyOptions = replyOptions
      .map((item) => item.replace("|", ","))
      .join("|");

    const fireColletion = firestore().collection("telegram_users_replies");

    const goodReply = () => {
      let customCallBack = (reply: TelegramUsersReplies | null) => null;
      const onResult = (result: any) => {
        const data = result.data();
        customCallBack(data);
      };
      const onError = () => {
        customCallBack(null);
      };
      console.log(TAG, "telegraminfo", telegramInfo);
      const listener = fireColletion
        .doc(telegramInfo.id)
        .onSnapshot(onResult, onError);

      return {
        setCallBack: (callBackfun: any) => {
          customCallBack = callBackfun;
        },
        stopListener: () => {
          listener();
          //
        },
      };
    };
    const sendMsj = (resolve: (res: callBackStop) => void, reject: any) => {
      fireColletion.doc(telegramInfo.id).update({ reply: "" });
      axios
        .post(
          "https://us-east1-accessatelegrambot1.cloudfunctions.net/sendBotMessage",
          {
            message: msj,
            idTelegramUser: telegramInfo.id,
            pendingResponse: "true",
            replyOptions: arrReplyOptions,
          },
          {
            headers: { "Content-Type": "application/json; charset=utf-8" },
            responseType: "json",
          },
        )
        .then((res) => {
          if (res.status === 200) {
            const data = res.data;
            if (data.result === "OK") {
              resolve(goodReply());
            }
          }
          reject(null);
        })
        .catch((err) => {
          console.log(TAG, " reject ", err);
          reject(null);
        });
    };

    return new Promise<callBackStop>(async (resolve, reject) => {
      try {
        const idTelegramUser = await that.getTelegram(resi).catch(() => null);
        if (idTelegramUser) {
          telegramInfo = idTelegramUser;
          sendMsj(resolve, reject);
          return;
        }
        reject(null);
      } catch (error) {
        reject(null);
      }
    });
  }
  saveResident(resi: ResidentType): Promise<string> {
    //
    const that = this;
    const currentGroup = that.group.currentGroup;

    return new Promise<string>((resolve, reject) => {
      try {
        const profileImageUri = resi.profileImage;
        resi.profileImage = "";

        const newResiRef = firestore()
          .collection("group")
          .doc(currentGroup)
          .collection("residents")
          .doc();
        const saveImage = (residentID = "") => {
          that.storage.saveFile(
            `/group/${currentGroup}/residents/${residentID}/profileImage`,
            profileImageUri,
            (p) => {
              console.log(TAG, "progress upload", p);
            },
            (uri) => {
              newResiRef.update({ profileImage: uri });
            },
          );
        };

        newResiRef
          .set(resi.exportToUpload())
          .then(() => {
            resolve(newResiRef.id);
            saveImage(newResiRef.id);
          })
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
      }
    });
  }
  searchResident(
    type: "idCard" | "sector" = "idCard",
    value = "",
  ): Promise<Array<ResidentType>> {
    const that = this;
    const currentGroup = that.group.currentGroup;
    console.log(TAG, type, value, currentGroup);
    return new Promise<Array<ResidentType>>((resolve, reject) => {
      try {
        try {
          const newResiRef = firestore()
            .collection("group")
            .doc(currentGroup)
            .collection("residents")
            .where(type, "==", value)
            .get()
            .then((data) => {
              const result: Array<ResidentType> = [];
              data.forEach((doc) => {
                result.push(new ResidentType(doc.id, <any>doc.data()));
              });
              console.log(TAG, result);
              if (result.length > 0) {
                resolve(result);
                return;
              }
              resolve([]);
            })
            .catch((error) => {
              reject(error);
            });
        } catch (error) {
          reject(error);
        }
      } catch (error) {
        reject(null);
      }
    });
  }
  getLastAccess(
    resident: ResidentType,
    limit = 1,
  ): Promise<Array<ResidentAccess>> {
    const that = this;
    const currentGroup = that.group.currentGroup;
    return new Promise<Array<ResidentAccess>>((resolve, reject) => {
      try {
        firestore()
          .collection("groups")
          .doc(currentGroup)
          .collection("access")
          .where("residentID", "==", resident.id)
          .limit(limit) //max 30
          .get()
          .then((data) => {
            const result: Array<ResidentAccess> = [];
            data.forEach((doc) => {
              result.push(new ResidentAccess(doc.id, <any>doc.data()));
            });
            if (result.length > 0) {
              resolve(result);
              return;
            }
            resolve([]);
          })
          .catch((error) => {
            console.log(TAG, error);
            reject(error);
          });
      } catch (error) {
        reject(null);
      }
    });
  }
  saveAccess(
    visitor: ResidentType,
    resident: ResidentType,
    exit = true,
  ): Promise<string> {
    const that = this;
    const currentGroup = that.group.currentGroup;

    const newAccess = new ResidentAccess("", {
      validatorID: resident.id,
      residentID: visitor.id,
      comment: "",
      creationDate: utils.dates.dateNowUnix(),
      sector: resident.sector,
      exit: exit,
    });

    return new Promise<string>((resolve, reject) => {
      try {
        const newAccessRef = firestore()
          .collection("groups")
          .doc(currentGroup)
          .collection("access")
          .doc();

        newAccessRef
          .set(newAccess.exportToUpload())
          .then(() => {
            resolve(newAccessRef.id);
          })
          .catch((err) => reject(err));
      } catch (error) {
        reject(error);
      }
    });
  }
  getAccessHistory(): Promise<ResidentAccess[]> {
    return new Promise<ResidentAccess[]>((resolve, reject) => {
      try {
        resolve([]);
      } catch (error) {
        reject(null);
      }
    });
  }
}
