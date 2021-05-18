export class TelegramUsersReplies {
  creationDate;
  idHistory;
  question;
  reply;
  constructor() {
    //
  }
}

export class TelegramUser {
  id;
  idTelegram;
  idCard;
  idGroup;
  name;
  sector;
  constructor() {
    //
  }
  exportToUpload() {
    return {
      id: this.id,
      idCard: this.idCard,
      idGroup: this.idGroup,
      name: this.name,
      sector: this.sector,
    };
  }
}
