import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { User, Business, Product } from "./interfaces";
import RNFetchBlob from "rn-fetch-blob";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RNFS from "react-native-fs";
import { all } from "core-js/fn/promise";
import { time } from "console";

const TAG = "API";

class Api {
  static instance: any;
  myuser: FirebaseAuthTypes.User;
  myinfo: User;
  currentBusiness: Business;
  allBusiness: Array<Business>;
  constructor() {
    if (typeof Api.instance === "object") {
      return Api.instance;
    }
    Api.instance = this;
    this.myuser = auth().currentUser;
    this.myinfo = new User();
    this.currentBusiness = new Business();
    this.allBusiness = null;
    return this;
  }
  async checkDefaults() {
    if (this.myuser == null) {
      this.myuser = auth().currentUser;
    }
    if (this.myinfo.uid == "") {
      const userInfo = await this.getUserInfo(this.myuser.uid);
      this.myinfo = userInfo;
    }
  }
  async getBusinessByArrIds(arrId = []): Promise<Array<Business>> {
    if (arrId.length == 0) {
      return null;
    }
    const myCollection = firestore()
      .collection("business")
      .where(firestore.FieldPath.documentId(), "in", arrId);
    const result = await myCollection.get();
    let resBusiness: Array<Business> = [];
    result.forEach((doc) => {
      const data = doc.data();
      console.log(TAG, data);
      const buss = new Business(doc.id, data);
      resBusiness.push(buss);
    });
    return resBusiness;
  }
  async getUserInfo(id: string) {
    const userInfo = await firestore().collection("users").doc(id).get();
    return new User(id, userInfo.data());
  }
  async getMyBusiness(): Promise<Array<Business>> {
    await this.checkDefaults();
    if (this.allBusiness == null) {
      const theBusiness = await this.getBusinessByArrIds(this.myinfo.business);
      this.allBusiness = theBusiness;
    }
    if (this.currentBusiness.isEmpty()) {
      this.currentBusiness = this.allBusiness[0];
    }
    return this.allBusiness;
  }
  setCurrentBusiness(business: Business) {
    if (!(business instanceof Business)) {
      return null;
    }
    if (business.isEmpty()) {
      return null;
    }
    this.currentBusiness = business;
  }
  async getProductsByBusiness(businessId = ""): Promise<Array<Product>> {
    if (businessId == "") {
      businessId = this.currentBusiness.id;
    }
    const myCollection = firestore().collection("products");
    const resultProducts = await myCollection
      .where("business", "==", businessId)
      .get();
    let allProducts = Array<Product>();
    resultProducts.forEach((doc) => {
      allProducts.push(new Product(doc.id, doc.data()));
    });
    return allProducts;
  }
  getProductsByBusinessEvent(businessId = "") {
    if (businessId == "") {
      businessId = this.currentBusiness.id;
    }
    let myUnSubscriber = () => {};
    const result: ProductsByBusinessEventType = {
      onUpdate: (fnResolve) => {
        try {
          const myCollection = firestore().collection("products");
          const subscriber = myCollection
            .where("business", "==", businessId)
            .where("imageUploaded", "==", true)
            .onSnapshot(function (resultProducts) {
              let allProducts = Array<Product>();
              resultProducts.forEach((doc) => {
                allProducts.push(new Product(doc.id, doc.data()));
              });
              console.log(TAG, "All products Snapshot is ", allProducts);
              fnResolve(allProducts);
            });
          myUnSubscriber = subscriber;
        } catch (error) {
          fnResolve(null);
        }
      },
      unSubcriber: () => {
        myUnSubscriber();
      },
    };
    return result;
  }
  getProductImage(businessId = "", productId = ""): Promise<string> {
    return new Promise<string>(async (resolve, reject) => {
      if (businessId == "" || productId == "") {
        resolve("businessId or productId is empty");
        return;
      }
      function getInternetFile() {
        const reference = storage().ref(pathStorageFile);
        console.log(TAG, pathStorageFile);
        reference
          .getDownloadURL()
          .then((theUrl) => {
            RNFetchBlob.config({
              fileCache: true,
              appendExt: "jpg",
            })
              .fetch("GET", theUrl)
              .then((resultFetch) => {
                console.log(TAG, "resultFetch", resultFetch);
                const finalUri = "file://" + resultFetch.path();
                AsyncStorage.setItem(pathStorageFile, finalUri);
                resolve(finalUri); //---------------------
              })
              .catch((err) => {
                reject(err);
              });
          })
          .catch((err) => {
            reject(err);
          });
      }
      const pathStorageFile = `business/${businessId}/products/${productId}`;

      AsyncStorage.getItem(pathStorageFile)
        .then((posibleUri) => {
          if (posibleUri !== null) {
            RNFS.exists(posibleUri)
              .then((fileExists) => {
                if (fileExists) {
                  resolve(posibleUri);
                } else {
                  getInternetFile();
                }
              })
              .catch((err) => {
                console.log(
                  TAG,
                  "File checker error --> proced to download file",
                  err,
                );
                getInternetFile();
              });
          } else {
            getInternetFile();
          }
        })
        .catch((err) => {
          getInternetFile();
        });
    });
  }
  async getMyInfo() {
    await this.checkDefaults();
    return await this.getUserInfo(this.myuser.uid);
  }
  async saveProduct(
    newProd: Product,
    imageUri: string = "",
    callBackProgress: Function,
  ) {
    console.log(TAG, "saveproduct");

    return new Promise<boolean>(async (resolve, reject) => {
      try {
        if (this.currentBusiness.isEmpty()) {
          resolve(null);
          return;
        }

        const businessId = this.currentBusiness.id;
        console.log(TAG, "Business ID = ", businessId, ", prod = ", newProd);

        if (!(newProd instanceof Product)) {
          reject("newProd isn't an instance of Product");
          return;
        }
        if (newProd.isEmpty(["id"])) {
          console.log(TAG, "SaveProduct is empty");
          reject("newProd is empty");
          return;
        }

        if (newProd.timeStamp == 0) {
          const timestamp = firestore.FieldValue.serverTimestamp();
          newProd.timeStamp = timestamp;
          //resultNewProduct.update({ timeStamp: timestamp });
        }

        const myCollection = firestore().collection("products");
        const resultNewProduct = await myCollection.add(newProd);

        console.log(TAG, "saveProduct Add", resultNewProduct);

        const pathStorageFile = `business/${businessId}/products/${resultNewProduct.id}`;
        console.log(TAG, pathStorageFile);

        const reference = storage().ref(pathStorageFile);
        const task = reference.putFile(imageUri);

        task.on("state_changed", (taskSnapshot) => {
          console.log(
            TAG,
            `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
          );
          callBackProgress(taskSnapshot.bytesTransferred);
        });

        task.then(() => {
          console.log(TAG, "Image uploaded to the bucket!");
          resultNewProduct.update({ imageUploaded: true });
          resolve(true);
        });
        task.catch((error) => {
          console.log(TAG, "Upload Product Catch", error);
          resultNewProduct.delete();
          reject("Upload image failed");
        });
      } catch (error) {
        console.log(TAG, "saveProduct", error);
        reject("Upload image process failed");
      }
    });
  }
}
export default new Api();

export type callbackProducts = (products: Array<Product>) => void;

export type FnBackProductsArray = (fn: callbackProducts) => void;

export interface ProductsByBusinessEventType {
  onUpdate: FnBackProductsArray;
  unSubcriber: Function;
}
