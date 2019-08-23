export class Usuario {
    constructor(
        public nombre: string,
        public numero: string,
        public password: string,
        public email: string,
        public factura?: boolean,
        public idFerrum?: string,
        public cat_cli?: string,
        public diavis?: string,
        public perid?: string,
        public rol?: string,
        public precio?: number,
        public rfc?: string,
        public activo?: string,
        public img?: string,
        public _id?: string
    ) { }
}
