import { Business } from "../interfaces";
class business implements Business {
    color = "pepe";
    constructor() {
        this.color = "hello";
    }
}

export default new business();
