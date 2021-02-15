import Dates from "./dates";
class Utils {
    constructor() {
        this.dates = Dates;
        this.counter = this.getRandomNumber(0, 9999);
    }
    getRandomNumber(min, max) {
        return Math.random() * (max - min) + min;
    }
    generateKey = (pre) => {
        this.counter++;
        return `${pre}_${new Date().getTime() + this.counter}`;
    }
    arrayOrderDesc(array = [], childName = "") {
        function compare(a, b) {
            if (typeof a[childName] == "undefined") {
                return 0;
            }
            if (typeof b[childName] == "undefined") {
                return 0;
            }
            if (a[childName] < b[childName]) {
                return -1;
            }
            if (a[childName] > b[childName]) {
                return 1;
            }
            return 0;
        }
        return [...array].sort(compare);// clone and sort
    }
    arrayOrderAsc(array = [], childName = "") {
        function compare(a, b) {
            if (typeof a[childName] == "undefined") {
                return 0;
            }
            if (typeof b[childName] == "undefined") {
                return 0;
            }
            if (a[childName] < b[childName]) {
                return 1;
            }
            if (a[childName] > b[childName]) {
                return -1;
            }
            return 0;
        }
        return [...array].sort(compare);// clone and sort
    }
}
export default new Utils();