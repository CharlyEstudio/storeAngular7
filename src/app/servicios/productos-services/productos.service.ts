import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// URL PRINCIPAL
import { LINK } from 'src/app/config/config';

@Injectable()
export class ProductosService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerMejoresVentasDia() {
    const url = LINK + '/productos/descuento';

    return this.http.get(url);
  }

  obtenerMarca (id: any) {
    const url = LINK + '/productos/marca/' + id;

    return this.http.get(url);
  }

  obtenerImagenes (codigo: any) {
    const url = LINK + '/productos/imagen/' + codigo;

    return this.http.get(url);
  }

  obtenerDescripcion(id: any) {
    const url = LINK + '/productos/descripcion/' + id;

    return this.http.get(url);
  }

  buscarProductos(termino: any) {
    const url = LINK + '/productos/buscar/' + termino;

    return this.http.get(url);
  }

  obtenerUnidades(id: any) {
    const url = LINK + '/productos/unidades/' + id;

    return this.http.get(url);
  }
}
