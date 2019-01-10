import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// Config
import { LINK } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(
    private http: HttpClient
  ) { }

  obtenerMunicipios() {
    const url = LINK + '/api/store/datos.php?opcion=1';

    return this.http.get(url);
  }

  obtenerClientes() {
    const url = LINK + '/api/store/datos.php?opcion=2';

    return this.http.get(url);
  }

  obtenerPedidos() {
    const url = LINK + '/api/store/datos.php?opcion=3';

    return this.http.get(url);
  }
}
