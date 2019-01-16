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
    const url = LINK + '/cobertura/municipios';

    return this.http.get(url);
  }

  obtenerClientes() {
    const url = LINK + '/cobertura/clientes';

    return this.http.get(url);
  }

  obtenerPedidos(inicio: any, final: any) {
    const url = LINK + '/cobertura/pedidos/' + inicio + '/' + final;

    return this.http.get(url);
  }

  obtenerClienteFerrum(numero: any) {
    const url = LINK + '/cobertura/cliente/' + numero;

    return this.http.get(url);
  }
}
