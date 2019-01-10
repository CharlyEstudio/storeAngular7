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
    const url = LINK + '/api/store/public.php?opcion=1';

    return this.http.get(url);
  }

  obtenerImagenes (codigo: any) {
    const url = LINK + '/api/store/public.php?opcion=2&codigo=' + codigo;

    return this.http.get(url);
  }

  obtenerDescripcion(id: any) {
    const url = LINK + '/api/store/public.php?opcion=3&articuloid=' + id;

    return this.http.get(url);
  }

  buscarProductos(termino: any) {
    const url = LINK + '/api/store/public.php?opcion=4&termino=' + termino;

    return this.http.get(url);
  }

  obtenerUnidades(id: any) {
    const url = LINK + '/api/store/public.php?opcion=5&articuloid=' + id;

    return this.http.get(url);
  }
}
