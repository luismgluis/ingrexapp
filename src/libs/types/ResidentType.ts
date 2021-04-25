type OptionalDataItem = {
  name: string;
  value: string;
};

interface ResidentTypeType {
  name: string;
  sector: string;
  idcard: string;
  qr: string;
  optionalData: Array<OptionalDataItem>;
}
export class ResidentType implements ResidentTypeType {
  id: string;
  name: string;
  sector: string;
  idcard: string;
  qr: string;
  optionalData: Array<OptionalDataItem>;
  constructor(id, datax, data: ResidentTypeType = null) {
    if (data == null) {
      data = datax;
    }
    this.id = id;
    this.name = data.name || "";
    this.sector = data.sector || "";
    this.idcard = data.idcard || "";
    this.qr = data.qr || "";
    this.optionalData = this.parseOptionalData(data.optionalData);
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
}
