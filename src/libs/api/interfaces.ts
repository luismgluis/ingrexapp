export interface Business {
    color?: string;
    width?: number;
}

export interface Product {
    uid?: string;
    name?: number;
    loadUser(uid: string): any;
    getDescription(limitCharts: number): string;
}
