export default class generalUtils {
  generateKeyCounter: number;
  constructor() {
    this.generateKeyCounter = 0;
  }
  generateKey(pre: string): string {
    const key = `${pre}_${new Date().getTime()}_${this.generateKeyCounter}`;
    this.generateKeyCounter++;
    return key;
  }
  validateEmail(email: string): boolean {
    if (email.length > 5 && email.includes("@") && !email.includes(" ")) {
      return true;
    }
    return false;
  }
}
