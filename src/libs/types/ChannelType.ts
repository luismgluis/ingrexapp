export class ChannelType {
  id: string;
  name: string;
  admins: Array<string>;
  creationDate: number;
  creator: string;
  chatRoomID: string;
  constructor(id: string, data: any) {
    this.id = id;
    this.name = data.name || "";
    this.admins = data.admins || "";
    this.creationDate = data.creationDate || [];
    this.creator = data.creator || "";
    this.chatRoomID = data.chatRoomID || "";
  }
  isEmpty(): boolean {
    if (this.id === "") {
      return true;
    }
    return false;
  }
}
