import firestore from "@react-native-firebase/firestore";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { User, Business } from "./interfaces";

class Api {
  static instance: any;
  myuser: FirebaseAuthTypes.User;
  myinfo: User;
  constructor() {
    if (typeof Api.instance === "object") {
      return Api.instance;
    }
    Api.instance = this;
    this.myuser = auth().currentUser;
    this.myinfo = new User();
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
  async getMyInfo() {
    await this.checkDefaults();
    return await this.getUserInfo(this.myuser.uid);
  }
}
export default new Api();
