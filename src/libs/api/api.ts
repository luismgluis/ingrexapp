import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { User, Business, Product } from "./interfaces";
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
  async getMyInfo() {
    await this.checkDefaults();
    return await this.getUserInfo(this.myuser.uid);
  }
  async saveProduct(newProd: Product, imageUri: string = "") {
    try {
      if (typeof newProd == "undefined") {
        return null;
      }
      if (newProd.isEmpty()) {
        console.log(TAG, "SaveProduct is empty");
        return null;
      }
      console.log(TAG, "saveproduct");
      const myCollection = firestore().collection("products");
      const result = await myCollection.add(newProd);
      console.log(TAG, "saveProduct Add", result);
      if (typeof result.id == "undefined") {
        return null;
      }
      //this.currentBusiness.id ----------▼
      const pathStorageFile = `business/${"gg"}/products/${result.id}`;
      const reference = storage().ref(pathStorageFile);
      const task = reference.putFile(imageUri);
      task.on("state_changed", (taskSnapshot) => {
        console.log(
          TAG,
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });
      task.then(() => {
        console.log(TAG, "Image uploaded to the bucket!");
      });
      task.catch((error) => {
        console.log(TAG, "Upload Product Catch", error);
      });
    } catch (error) {
      console.log(TAG, "saveProduct", error);
      return null;
    }
  }
}
export default new Api();
