import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { User, Business, Product } from "./interfaces";
import { reject } from "core-js/fn/promise";
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
        const businessId = this.currentBusiness.id;
        if (!(newProd instanceof Product)) {
          reject("newProd isn't an instance of Product");
        }
        if (newProd.isEmpty()) {
          console.log(TAG, "SaveProduct is empty");
          reject("newProd is empty");
        }

        const myCollection = firestore().collection("products");
        const resultNewProduct = await myCollection.add(newProd);

        if (newProd.timeStamp == 0) {
          const timestamp = firestore.FieldValue.serverTimestamp();
          resultNewProduct.update({ timeStamp: timestamp });
        }

        console.log(TAG, "saveProduct Add", resultNewProduct);

        const pathStorageFile = `business/${businessId}/products/${resultNewProduct.id}`;
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
