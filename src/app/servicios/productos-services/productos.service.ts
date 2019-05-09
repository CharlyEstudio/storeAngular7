import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// URL PRINCIPAL
import { LINK } from 'src/app/config/config';

@Injectable()
export class ProductosService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerMejoresVentasDia(precio: number = 3) {
    const url = LINK + '/productos/descuento/' + precio;

    return this.http.get(url);
  }

  promotruper(precio: number = 3) {
    const url = LINK + '/productos/promotruper/' + precio;

    return this.http.get(url);
  }

  obtenerMarca (id: any) {
    const url = LINK + '/productos/marca/' + id;

    return this.http.get(url);
  }

  obtenerMarcasTruper () {
    const url = LINK + '/productos/marcas/truper';

    return this.http.get(url);
  }

  obtenerMarcasFMO () {
    const url = LINK + '/productos/marcas/fmo';

    return this.http.get(url);
  }

  obtenerProductosPorMarca(marca: any, precio: number) {
    const url = LINK + '/productos/productos/marca/' + marca + '/' + precio;

    return this.http.get(url);
  }

  obtenerImagenes (codigo: any) {
    const url = LINK + '/productos/imagen/' + codigo;

    return this.http.get(url);
  }

  obtenerDescripcion(id: any, precio: number) {
    const url = LINK + '/productos/descripcion/' + id + '/' + precio;

    return this.http.get(url);
  }

  buscarProductosID(id: any, precio: number = 3) {
    const url = LINK + '/productos/buscar/id/' + id + '/' + precio;

    return this.http.get(url);
  }

  buscarProductos(termino: any, precio: number = 3) {
    const url = LINK + '/productos/buscar/' + termino + '/' + precio;

    return this.http.get(url);
  }

  buscarProductoCodigo(termino: any, precio: number = 3) {
    const url = LINK + '/productos/buscar/codigo/' + termino + '/' + precio;

    return this.http.get(url);
  }

  obtenerUnidades(id: any) {
    const url = LINK + '/productos/unidades/' + id;

    return this.http.get(url);
  }

  obtenerBackOrder(numero: any, inicio: any, final: any, precio: any) {
    const url = LINK + '/productos/back/order/' + numero + '/' + inicio + '/' + final + '/' + precio;

    return this.http.get(url);
  }

  obtenerTopTen(numero: any, inicio: any, final: any, precio: any) {
    const url = LINK + '/productos/top/ten/' + numero + '/' + inicio + '/' + final + '/' + precio;

    return this.http.get(url);
  }
}
