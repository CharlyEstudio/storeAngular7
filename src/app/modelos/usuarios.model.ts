export class Usuario {
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public factura: boolean,
        public numero?: string,
        public idFerrum?: string,
        public cat_cli?: string,
        public diavis?: string,
        public perid?: string,
        public rol?: string,
        public precio?: number,
        public rfc?: string,
        public img?: string,
        public activo?: string,
        public _id?: string
    ) { }
}
