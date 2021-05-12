import api from "../api/api";
import utils from "../utils/utils";

type OptionalDataItem = {
  name: string;
  value: string;
};
export interface ResidentAccessType {
  id?: string;
  comment: string;
  creationDate: number;
  residentID: string;
  validatorID: string;
  sector: string;
  exit: boolean;
}
export class ResidentAccess implements ResidentAccessType {
  id: string;
  comment: string;
  creationDate: number;
  residentID: string;
  validatorID: string;
  sector: string;
  exit: boolean;
  constructor(id, datax, data: ResidentAccessType = null) {
    if (data == null) data = datax;
    this.id = id;
    this.comment = data.comment || "";
    this.creationDate = data.creationDate || 0;
    this.residentID = data.residentID || "";
    this.sector = data.sector || "";
    this.validatorID = data.validatorID || "";
    this.exit = utils.objects.isEmpty(data.exit) ? false : data.exit;
  }
  exportToUpload(): ResidentAccessType {
    return {
      comment: this.comment,
      creationDate: this.creationDate,
      residentID: this.residentID,
      sector: this.sector,
      validatorID: this.validatorID,
      exit: this.exit,
    };
  }
}

interface ResidentTypeType {
  name: string;
  sector?: string;
  idCard: string;
  qr?: string;
  telegram: string;
  phone: string;
  profileImage: string;
  optionalData?: Array<OptionalDataItem>;
  isVisitor?: boolean;
}

export class ResidentType implements ResidentTypeType {
  id: string;
  name: string;
  sector: string;
  idCard: string;
  qr: string;
  telegram: string;
  phone: string;
  profileImage: string;
  optionalData?: Array<OptionalDataItem>;
  isVisitor?: boolean;
  constructor(id, datax, data: ResidentTypeType = null) {
    if (data == null) {
      data = datax;
    }
    this.id = id;
    this.name = data.name || "";
    this.sector = data.sector || "";
    this.idCard = data.idCard || "";
    this.qr = data.qr || "";
    this.telegram = data.telegram || "";
    this.phone = data.phone || "";
    this.profileImage = data.profileImage || "";
    this.isVisitor = utils.objects.isEmpty(data.isVisitor)
      ? true
      : data.isVisitor;
    this.optionalData = this.parseOptionalData(data.optionalData);
  }
  isEmpty(): boolean {
    if (this.id === "") {
      return true;
    }
    return false;
  }
  parseOptionalData(data: Array<any>): Array<OptionalDataItem> {
    if (!Array.isArray(data)) return [];
    return data.map((item) => {
      try {
        return JSON.parse(item);
      } catch (error) {
        return null;
      }
    });
  }
  getLastAccess(): Promise<ResidentAccess> {
    const that = this;
    return new Promise<ResidentAccess>((resolve, reject) => {
      try {
        api.residents
          .getLastAccess(that)
          .then((data) => {
            if (data.length > 0) resolve(data[0]);
            if (!(data.length > 0)) reject(null);
          })
          .catch(() => reject(null));
      } catch (error) {
        reject(null);
      }
    });
  }
  exportToUpload(): ResidentTypeType {
    if (this.isVisitor) {
      return {
        name: this.name,
        idCard: this.idCard,
        telegram: this.telegram,
        phone: this.phone,
        profileImage: this.profileImage,
        optionalData: this.optionalData,
        isVisitor: this.isVisitor,
      };
    }
    return {
      name: this.name,
      sector: this.sector,
      idCard: this.idCard,
      qr: this.qr,
      telegram: this.telegram,
      phone: this.phone,
      profileImage: this.profileImage,
      optionalData: this.optionalData,
      isVisitor: this.isVisitor,
    };
  }
}
