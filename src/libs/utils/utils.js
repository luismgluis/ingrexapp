class Utils {
    constructor() { }
    generateKey = (pre) => {
        return `${pre}_${new Date().getTime()}`;
    }
}
export default new Utils();