class dates {
  constructor() {

  }
  dateToString(date, withHour = false, withSec = false, withMonthName = false) {
    const a = new Date(date);
    const months = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    const year = a.getFullYear();
    const MONTH = months[a.getMonth()];
    let month = a.getMonth() + 1;
    const day = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();

    if (withMonthName) {
      month = MONTH;
    }

    let time = day + '/' + month + '/' + year;
    if (withHour) {
      time += ' ' + hour + ':' + min;
    }
    if (withSec) {
      time += '.' + sec;
    }
    return time
  }
  unixToDate(UNIX_timestamp) {
    return new Date(UNIX_timestamp * 1000);
  }
  unixToString(UNIX_timestamp, withHour = false, withSec = false, withMonthName = false) {
    const a = this.unixToDate(UNIX_timestamp);
    const time = this.dateToString(a, withHour, withSec, withMonthName)
    return time;
  }
  dateNowString(withHour = false, withSec = false, withMonthName = false) {
    const u = this.dateNowUnix();
    const a = this.unixToDate(u);
    return this.dateToString(a, withHour, withSec, withMonthName)
  }
  dateNowUnix() {
    return Math.round(+new Date() / 1000);
  }
}
export default new dates();