class dates {
  constructor() {
    /* */
  }
  dateToString(
    date: Date,
    withHour = false,
    withSec = false,
    withMonthName = false,
  ): string {
    const a = new Date(date);
    const months = [
      "Ene",
      "Feb",
      "Mar",
      "Abr",
      "May",
      "Jun",
      "Jul",
      "Ago",
      "Sep",
      "Oct",
      "Nov",
      "Dic",
    ];
    const year = a.getFullYear();
    const MONTH = months[a.getMonth()];
    let month = `${a.getMonth() + 1}`;
    const day = a.getDate();
    const hour = a.getHours();
    const min = a.getMinutes();
    const sec = a.getSeconds();

    if (withMonthName) {
      month = MONTH;
    }

    let time = day + "/" + month + "/" + year;
    if (withHour) {
      time += " " + hour + ":" + min;
    }
    if (withSec) {
      time += "." + sec;
    }
    return time;
  }
  unixToDate(UNIX_timestamp: number): Date {
    return new Date(UNIX_timestamp * 1000);
  }
  unixToString(
    UNIX_timestamp: number,
    withHour = false,
    withSec = false,
    withMonthName = false,
  ): string {
    const a = this.unixToDate(UNIX_timestamp);
    const time = this.dateToString(a, withHour, withSec, withMonthName);
    return time;
  }
  dateNowString(
    withHour = false,
    withSec = false,
    withMonthName = false,
  ): string {
    const u = this.dateNowUnix();
    const a = this.unixToDate(u);
    return this.dateToString(a, withHour, withSec, withMonthName);
  }
  dateNowUnix(): number {
    return Math.round(+new Date() / 1000);
  }
  secsToTime(valTime: number): string {
    if (valTime) {
      let secs = parseInt("" + valTime / 1000, 10);
      const mins = (() => {
        if (secs > 59) {
          secs -= 59;
          return 1;
        }
        return 0;
      })();
      return `${mins > 9 ? mins : "0" + mins}:${secs > 9 ? secs : "0" + secs}`;
    }
    return "00:00";
  }
}
export default dates;
