import firestore from "@react-native-firebase/firestore";
import storage from "@react-native-firebase/storage";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { User, Business, Product } from "./interfaces";

class Api {
  static instance: any;
  myuser: FirebaseAuthTypes.User;
  myinfo: User;
  currentBusiness: Business;
  constructor() {
    if (typeof Api.instance === "object") {
      return Api.instance;
    }
    Api.instance = this;
    this.myuser = auth().currentUser;
    this.myinfo = new User();
    this.currentBusiness = new Business();
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
      console.log(data);
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
    const theBusiness = this.getBusinessByArrIds(this.myinfo.business);
    return theBusiness;
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
        console.log("SaveProduct is empty");
        return null;
      }
      console.log("saveproduct");
      const myCollection = firestore().collection("products");
      const result = await myCollection.add(newProd);
      console.log("saveProduct Add", result);
      if (typeof result.id == "undefined") {
        return null;
      }
      //this.currentBusiness.id ----------▼
      const pathStorageFile = `business/${"gg"}/products/${result.id}`;
      const reference = storage().ref(pathStorageFile);
      const task = reference.putFile(imageUri);
      task.on("state_changed", (taskSnapshot) => {
        console.log(
          `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
        );
      });
      task.then(() => {
        console.log("Image uploaded to the bucket!");
      });
      task.catch((error) => {
        console.log("Upload Product Catch", error);
      });
    } catch (error) {
      console.log("saveProduct", error);
      return null;
    }
  }
}
export default new Api();
