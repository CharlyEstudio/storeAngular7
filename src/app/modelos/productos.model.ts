export class Producto {
    constructor(
        public id: number,
        public descripcion: string,
        public clave: string,
        public codigo: number,
        public precioneto: number,
        public iva: number,
        public precio: number,
        public precioAumentado: number,
        public img: string,
        public descuento: string,
        public entregado?: number,
        public solicitado?: number
    ) {}
}
