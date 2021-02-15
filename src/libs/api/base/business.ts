class business {
  id: string;
  admins: Array<string>;
  createDate: number;
  crator: string;
  description: string;
  name: string;
  constructor(id: string, data: any) {
    this.id = id;
    this.admins = data.admins || [];
    this.createDate = data.createDate?.seconds || data.createDate || 0;
    this.description = data.description || "";
    this.name = data.name || "";
  }
}

export default business;
