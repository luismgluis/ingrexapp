import firestore from "@react-native-firebase/firestore";
import auth from "@react-native-firebase/auth";
import { User, Business } from "./interfaces";
class Api {
  constructor() {
    if (typeof Api.instance === "object") {
      return Api.instance;
    }
    Api.instance = this;
    this.myuser = auth().currentUser;
    this.myinfo = new User()
    return this;
  }
  async getMyBusiness() {
    if (this.myuser == null) {
      this.myuser = auth().currentUser;
    }
    if (this.myinfo.uid == "") {
      const userInfo = await this.getUserInfo(this.myuser.uid);
      this.myinfo = userInfo;
    }
    const theBusiness = this.getBusinessByArrIds(this.myinfo.business);
    return theBusiness;
  }
  async getBusinessByArrIds(arrId = []) {
    if (arrId.length == 0) {
      return {};
    }
    const myCollection = firestore().collection('business').where(firestore.FieldPath.documentId(), "in", arrId);
    const result = await myCollection.get();
    let resBusiness = {};
    result.forEach((doc) => {
      const data = doc.data();
      console.log(data);
      resBusiness[doc.id] = data;
    })
    return resBusiness;
  }
  async getUserInfo(id) {
    const userInfo = await firestore().collection('users').doc(id).get();
    return new User(id, userInfo.data());
  }
  getMyInfo() {

  }
}
export default new Api();
