export interface UserTypeX {
  id: string;
  name: string;
  nickname: string;
  email: string;
  localSaveCreationDate?: number;
  creationDate: number;
  profileImage?: string;
}
export default class UserType implements UserTypeX {
  id: string;
  name: string;
  email: string;
  nickname: string;
  profileImage?: string;
  localSaveCreationDate?: number;
  creationDate: number;
  constructor(id: string, data: any, datax: UserTypeX | null = null) {
    if (datax !== null) {
      data = datax;
    }
    this.id = id;
    this.name = data.name || "";
    this.email = data.email || "";
    this.nickname = data.nickname || "";
    this.creationDate = data.creationDate || 0;
    this.profileImage = data.profileImage || "";
    this.localSaveCreationDate = data.localSaveCreationDate || 0;
  }
  isEmpty(): boolean {
    if (this.id === "" || this.name === "") {
      return true;
    }
    return false;
  }
}
