export default class GroupType {
  id: string;
  admins: string[];
  at: string;
  creationDate: number;
  creator: string;
  name: string;
  public: boolean;
  constructor(id: string, data) {
    this.id = id;
    this.admins = data.admins || [];
    this.at = data.at || "";
    this.creationDate = data.creationDate || 0;
    this.creator = data.creator || "";
    this.name = data.name || "";
    this.public = data.public || false;
  }
}
