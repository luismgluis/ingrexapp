interface ChannelTypeType {
  id: string;
  name: string;
  onlyAdmins: boolean;
  creationDate: number;
  creator: string;
  chatRoomID: string;
}
export class ChannelType {
  id: string;
  name: string;
  onlyAdmins: boolean;
  creationDate: number;
  creator: string;
  chatRoomID: string;
  constructor(id: string, data: any, datax?: ChannelTypeType) {
    if (data == null) {
      data = datax;
    }
    this.id = id;
    this.name = data.name || "";
    this.onlyAdmins = data.onlyAdmins || false;
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
  exportToUpload(): any {
    const that = this;
    return {
      name: that.name || "",
      onlyAdmins: that.onlyAdmins || false,
      creationDate: that.creationDate || [],
      creator: that.creator || "",
      chatRoomID: that.chatRoomID || "",
    };
  }
}
