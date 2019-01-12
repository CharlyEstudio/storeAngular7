export class Producto {
    constructor(
        public articuloid: number,
        public descripcion: string,
        public clave: string,
        public codigo: number,
        public marca: string,
        public cantidad: number,
        public precioneto: number,
        public iva: number,
        public precio: number,
        public precioAumentado: number,
        public img: string,
        public descuento: string,
        public precioFinal?: number,
        public entregado?: number,
        public solicitado?: number,
        public divide?: number,
        public tipoSurtido?: string,
        public msg?: string,
        public pz?: number,
        public inner?: number,
        public ma?: number
    ) {}
}
