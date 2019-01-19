import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

// Config
import { LINK } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class DatosService {

  constructor(
    private http: HttpClient
  ) { }

  fechaTrimestre(mes: any, year: any) {

    let mesInicio;
    let mesFinal;

    if ( mes >= 1 && mes <= 3 ) {
      mesInicio = year + '-' + '01-01';
      mesFinal = year + '-' + '03-31';
      const fecha = Array({
        'mesInicio': mesInicio,
        'mesFinal': mesFinal
      });
      return fecha;
    }

    if ( mes >= 4 && mes <= 6 ) {
      mesInicio = year + '-' + '04-01';
      mesFinal = year + '-' + '06-30';
      const fecha = Array({
        'mesInicio': mesInicio,
        'mesFinal': mesFinal
      });
      return fecha;
    }

    if ( mes >= 7 && mes <= 9 ) {
      mesInicio = year + '-' + '07-01';
      mesFinal = year + '-' + '09-30';
      const fecha = Array({
        'mesInicio': mesInicio,
        'mesFinal': mesFinal
      });
      return fecha;
    }

    if ( mes >= 10 && mes <= 12 ) {
      mesInicio = year + '-' + '10-01';
      mesFinal = year + '-' + '12-31';
      const fecha = Array({
        'mesInicio': mesInicio,
        'mesFinal': mesFinal
      });
      return fecha;
    }
  }

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

  obtenerAsesor(idFerrum: any) {
    const url = LINK + '/usuario/buscar/especifico/' + idFerrum;

    return this.http.get(url);
  }

  obtenerSaldo(fecha: any, numero: any) {
    const url = LINK + '/cobertura/saldo/vigente/' + numero + '/' + fecha;

    return this.http.get(url);
  }

  obtenerPagos(numero: any, inicio: any, final: any) {
    const url = LINK + '/cobertura/pagos/periodo/' + numero + '/' + inicio + '/' + final;

    return this.http.get(url);
  }

  obtenerFacturas(cliente: any, inicio: any) {
    const url = LINK + '/cobertura/facturas/' + cliente + '/' + inicio;

    return this.http.get(url);
  }

  obtenerMovimiento(docid: any) {
    const url = LINK + '/cobertura/documento/' + docid;

    return this.http.get(url);
  }

  compras(numero: any, inicio: any, final: any) {
    const url = LINK + '/cobertura/compras/' + numero + '/' + inicio + '/' + final;

    return this.http.get(url);
  }

  obtenerFacturasMes(clienteid: any, inicio: any, final: any) {
    const url = LINK + '/cobertura/facturas/mes/' + clienteid + '/' + inicio + '/' + final;

    return this.http.get(url);
  }
}
