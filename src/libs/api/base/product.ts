class product {
  id: string;
  name: string;
  urlImg: string;
  business: string;
  description: string;
  timeStamp: number;
  constructor(id: string = "", data: any = {}) {
    this.id = id;
    this.name = data.name || "";
    this.description = data.description || "";
    this.urlImg = data.urlImg || "";
    this.business = data.business || "";
    this.timeStamp = data.timeStamp || 0;
  }
  create(name = "", description = "") {
    this.name = name;
    this.description = description;
  }
  isEmpty() {
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
