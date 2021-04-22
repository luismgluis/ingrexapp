class user {
  uid: string;
  name: string;
  business: Array<string>;
  constructor(uid: string = "", data: any = {}) {
    this.uid = uid;
    this.name = data.name || "";
    this.business = data.business || [];
  }
}
export default user;
