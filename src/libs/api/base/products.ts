import { Product } from "../interfaces";
class products implements Product {
    constructor() {
        this.getDescription();
    }
    getDescription(): string {
        return "";
    }
    loadUser() {
        return "";
    }
}
export default new products();
