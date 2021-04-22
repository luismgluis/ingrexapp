import { FirebaseFirestoreTypes } from "@react-native-firebase/firestore";

class product {
  id: string;
  name: string;
  urlImg: string;
  imageUploaded: boolean;
  business: string;
  description: string;
  timeStamp: FirebaseFirestoreTypes.FieldValue | number;
  constructor(id: string = "", data: any = {}) {
    this.id = id;
    this.name = data.name || "";
    this.description = data.description || "";
    this.urlImg = data.urlImg || "";
    this.business = data.business || "";
    this.timeStamp = data.timeStamp || 0;
    this.imageUploaded = data.imageUpload || false;
  }
  create(business: string, name: string, description = "") {
    this.business = business;
    this.name = name;
    this.description = description;
  }
  isEmpty(paramsIgnored = []) {
    if (this.id == "" && !paramsIgnored.includes("id")) {
      return true;
    }
    if (this.business == "" && !paramsIgnored.includes("business")) {
      return true;
    }

    const strings = [this.id, this.name, this.urlImg, this.business];
    for (const key in strings) {
      if (!Object.prototype.hasOwnProperty.call(strings, key)) {
        continue;
      }
      const element = strings[key];
      if (element !== "") {
        return false;
      }
    }
    return true;
  }
}
export default product;
