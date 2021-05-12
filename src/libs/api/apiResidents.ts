import { ResidentType } from "../types/ResidentType";
import firestore from "@react-native-firebase/firestore";
import ApiGroup from "./apiGroups";
import { ResidentAccess } from "./../types/ResidentType";
import ApiStorage from "./apiStorage";
import utils from "../utils/utils";
const TAG = "API RESIDENTS";
export class ApiResidents {
  group: ApiGroup;
  storage: ApiStorage;
  constructor() {
    this.storage = new ApiStorage();
    this.group = new ApiGroup();
    //
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
          .collection("groups_residents")
          .doc(currentGroup)
          .collection("residents")
          .doc();
        ///groups_residents/bPiR5KBVUjkiiaHyKWNs/residents/Xv946lrYWlINooNrHGtv

        const saveImage = (residentID = "") => {
          that.storage.saveFile(
            `/groups_residents/${currentGroup}/residents/${residentID}/profileImage`,
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
            .collection("groups_residents")
            .doc(currentGroup)
            .collection("residents")
            .where(type, "==", value)
            .get()
            .then((data) => {
              const result: Array<ResidentType> = [];
              data.forEach((doc) => {
                result.push(new ResidentType(doc.id, doc.data()));
              });
              if (result.length > 0) {
                resolve(result);
                return;
              }
              reject(null);
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
          .collection("groups_access")
          .doc(currentGroup)
          .collection("access")
          .where("residentID", "==", resident.id)
          .limit(limit) //max 30
          .get()
          .then((data) => {
            const result: Array<ResidentAccess> = [];
            data.forEach((doc) => {
              result.push(new ResidentAccess(doc.id, doc.data()));
            });
            if (result.length > 0) {
              resolve(result);
              return;
            }
            reject(null);
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

    const newAccess = new ResidentAccess(
      "",
      {},
      {
        validatorID: resident.id,
        residentID: visitor.id,
        comment: "",
        creationDate: utils.dates.dateNowUnix(),
        sector: resident.sector,
        exit: exit,
      },
    );

    return new Promise<string>((resolve, reject) => {
      try {
        const newAccessRef = firestore()
          .collection("groups_access")
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
}
