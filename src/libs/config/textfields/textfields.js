class TextFields {
    static instance = new TextFields();
    constructor() {
        this.users = "Products";
        this.stats = "Inicio"; //Estadisticas
        this.sales = "Ventas";
        this.perfil = "Perfil";
        //--------------------
        this.pages = {
            home: {
                perfil: this.perfil,
                sales: this.sales,
                stats: this.stats,
            },
        };
    }
}
export default new TextFields();
