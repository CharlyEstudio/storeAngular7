import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';

// Config
import { LINK, PATH_LINK } from 'src/app/config/config';

// Modelos
import { Usuario } from 'src/app/modelos/usuarios.model';

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

  trimestreBono(month: any, year: any) {
    let mes1;
    let mes2;
    let mes3;

    let fecMes1Sem1Inicio;
    let fecMes1Sem1Fin;
    let fecMes1Sem2Inicio;
    let fecMes1Sem2Fin;
    let fecMes1Sem3Inicio;
    let fecMes1Sem3Fin;
    let fecMes1Sem4Inicio;
    let fecMes1Sem4Fin;

    let fecMes2Sem1Inicio;
    let fecMes2Sem1Fin;
    let fecMes2Sem2Inicio;
    let fecMes2Sem2Fin;
    let fecMes2Sem3Inicio;
    let fecMes2Sem3Fin;
    let fecMes2Sem4Inicio;
    let fecMes2Sem4Fin;

    let fecMes3Sem1Inicio;
    let fecMes3Sem1Fin;
    let fecMes3Sem2Inicio;
    let fecMes3Sem2Fin;
    let fecMes3Sem3Inicio;
    let fecMes3Sem3Fin;
    let fecMes3Sem4Inicio;
    let fecMes3Sem4Fin;

    if ( month >= 1 && month <= 3) {
      mes1 = 'Enero';
      mes2 = 'Febrero';
      mes3 = 'Marzo';

      fecMes1Sem1Inicio = year + '-01-01';
      fecMes1Sem1Fin = year + '-01-07';
      fecMes1Sem2Inicio = year + '-01-08';
      fecMes1Sem2Fin = year + '-01-15';
      fecMes1Sem3Inicio = year + '-01-16';
      fecMes1Sem3Fin = year + '-01-23';
      fecMes1Sem4Inicio = year + '-01-24';
      fecMes1Sem4Fin = year + '-01-31';

      fecMes2Sem1Inicio = year + '-02-01';
      fecMes2Sem1Fin = year + '-02-07';
      fecMes2Sem2Inicio = year + '-02-08';
      fecMes2Sem2Fin = year + '-02-15';
      fecMes2Sem3Inicio = year + '-02-16';
      fecMes2Sem3Fin = year + '-02-23';
      fecMes2Sem4Inicio = year + '-02-24';
      fecMes2Sem4Fin = year + '-02-28';

      fecMes3Sem1Inicio = year + '-03-01';
      fecMes3Sem1Fin = year + '-03-07';
      fecMes3Sem2Inicio = year + '-03-08';
      fecMes3Sem2Fin = year + '-03-15';
      fecMes3Sem3Inicio = year + '-03-16';
      fecMes3Sem3Fin = year + '-03-23';
      fecMes3Sem4Inicio = year + '-03-24';
      fecMes3Sem4Fin = year + '-03-31';
    } else if (month >= 4 && month <= 6) {
      mes1 = 'Abril';
      mes2 = 'Mayo';
      mes3 = 'Junio';

      fecMes1Sem1Inicio = year + '-04-01';
      fecMes1Sem1Fin = year + '-04-07';
      fecMes1Sem2Inicio = year + '-04-08';
      fecMes1Sem2Fin = year + '-04-15';
      fecMes1Sem3Inicio = year + '-04-16';
      fecMes1Sem3Fin = year + '-04-23';
      fecMes1Sem4Inicio = year + '-04-24';
      fecMes1Sem4Fin = year + '-04-30';

      fecMes2Sem1Inicio = year + '-05-01';
      fecMes2Sem1Fin = year + '-05-07';
      fecMes2Sem2Inicio = year + '-05-08';
      fecMes2Sem2Fin = year + '-05-15';
      fecMes2Sem3Inicio = year + '-05-16';
      fecMes2Sem3Fin = year + '-05-23';
      fecMes2Sem4Inicio = year + '-05-24';
      fecMes2Sem4Fin = year + '-05-31';

      fecMes3Sem1Inicio = year + '-06-01';
      fecMes3Sem1Fin = year + '-06-07';
      fecMes3Sem2Inicio = year + '-06-08';
      fecMes3Sem2Fin = year + '-06-15';
      fecMes3Sem3Inicio = year + '-06-16';
      fecMes3Sem3Fin = year + '-06-23';
      fecMes3Sem4Inicio = year + '-06-24';
      fecMes3Sem4Fin = year + '-06-31';
    } else if (month >= 7 && month <= 9) {
      mes1 = 'Julio';
      mes2 = 'Agosto';
      mes3 = 'Septiembre';

      fecMes1Sem1Inicio = year + '-07-01';
      fecMes1Sem1Fin = year + '-07-07';
      fecMes1Sem2Inicio = year + '-07-08';
      fecMes1Sem2Fin = year + '-07-15';
      fecMes1Sem3Inicio = year + '-07-16';
      fecMes1Sem3Fin = year + '-07-23';
      fecMes1Sem4Inicio = year + '-07-24';
      fecMes1Sem4Fin = year + '-07-31';

      fecMes2Sem1Inicio = year + '-08-01';
      fecMes2Sem1Fin = year + '-08-07';
      fecMes2Sem2Inicio = year + '-08-08';
      fecMes2Sem2Fin = year + '-08-15';
      fecMes2Sem3Inicio = year + '-08-16';
      fecMes2Sem3Fin = year + '-08-23';
      fecMes2Sem4Inicio = year + '-08-24';
      fecMes2Sem4Fin = year + '-08-31';

      fecMes3Sem1Inicio = year + '-09-01';
      fecMes3Sem1Fin = year + '-09-07';
      fecMes3Sem2Inicio = year + '-09-08';
      fecMes3Sem2Fin = year + '-09-15';
      fecMes3Sem3Inicio = year + '-09-16';
      fecMes3Sem3Fin = year + '-09-23';
      fecMes3Sem4Inicio = year + '-09-24';
      fecMes3Sem4Fin = year + '-09-30';
    } else if (month >= 10 && month <= 12) {
      mes1 = 'Octubre';
      mes2 = 'Noviembre';
      mes3 = 'Diciembre';

      fecMes1Sem1Inicio = year + '-10-01';
      fecMes1Sem1Fin = year + '-10-07';
      fecMes1Sem2Inicio = year + '-10-08';
      fecMes1Sem2Fin = year + '-10-15';
      fecMes1Sem3Inicio = year + '-10-16';
      fecMes1Sem3Fin = year + '-10-23';
      fecMes1Sem4Inicio = year + '-10-24';
      fecMes1Sem4Fin = year + '-10-31';

      fecMes2Sem1Inicio = year + '-11-01';
      fecMes2Sem1Fin = year + '-11-07';
      fecMes2Sem2Inicio = year + '-11-08';
      fecMes2Sem2Fin = year + '-11-15';
      fecMes2Sem3Inicio = year + '-11-16';
      fecMes2Sem3Fin = year + '-11-23';
      fecMes2Sem4Inicio = year + '-11-24';
      fecMes2Sem4Fin = year + '-11-30';

      fecMes3Sem1Inicio = year + '-12-01';
      fecMes3Sem1Fin = year + '-12-07';
      fecMes3Sem2Inicio = year + '-12-08';
      fecMes3Sem2Fin = year + '-12-15';
      fecMes3Sem3Inicio = year + '-12-16';
      fecMes3Sem3Fin = year + '-12-23';
      fecMes3Sem4Inicio = year + '-12-24';
      fecMes3Sem4Fin = year + '-12-31';
    }

    const fecha = {
    'mes1': mes1,
    'mes2': mes2,
    'mes3': mes3,

    'fecMes1Sem1Inicio': fecMes1Sem1Inicio,
    'fecMes1Sem1Fin': fecMes1Sem1Fin,
    'fecMes1Sem2Inicio': fecMes1Sem2Inicio,
    'fecMes1Sem2Fin': fecMes1Sem2Fin,
    'fecMes1Sem3Inicio': fecMes1Sem3Inicio,
    'fecMes1Sem3Fin': fecMes1Sem3Fin,
    'fecMes1Sem4Inicio': fecMes1Sem4Inicio,
    'fecMes1Sem4Fin': fecMes1Sem4Fin,

    'fecMes2Sem1Inicio': fecMes2Sem1Inicio,
    'fecMes2Sem1Fin': fecMes2Sem1Fin,
    'fecMes2Sem2Inicio': fecMes2Sem2Inicio,
    'fecMes2Sem2Fin': fecMes2Sem2Fin,
    'fecMes2Sem3Inicio': fecMes2Sem3Inicio,
    'fecMes2Sem3Fin': fecMes2Sem3Fin,
    'fecMes2Sem4Inicio': fecMes2Sem4Inicio,
    'fecMes2Sem4Fin': fecMes2Sem4Fin,

    'fecMes3Sem1Inicio': fecMes3Sem1Inicio,
    'fecMes3Sem1Fin': fecMes3Sem1Fin,
    'fecMes3Sem2Inicio': fecMes3Sem2Inicio,
    'fecMes3Sem2Fin': fecMes3Sem2Fin,
    'fecMes3Sem3Inicio': fecMes3Sem3Inicio,
    'fecMes3Sem3Fin': fecMes3Sem3Fin,
    'fecMes3Sem4Inicio': fecMes3Sem4Inicio,
    'fecMes3Sem4Fin': fecMes3Sem4Fin,
    };
    return fecha;
  }

  obtenerFechaActual() {
    const h = new Date();

    let dia;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    let mes;

    if (h.getMonth() < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    const anio = h.getFullYear();

    const fecha = anio + '-' + mes + '-' + dia;

    return fecha;
  }

  obtenerEstados() {
    const url = LINK + '/cobertura/estados';

    return this.http.get(url);
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

  obtenerVencidos(id: any, fecha: any) {
    const url = LINK + '/cobertura/facturas/vencidas/' + id + '/' + fecha;

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

  obtenerComprasTrimestrales(numero: any, data: any[]) {
    const url = LINK + '/cobertura/trimestre/bono/' + numero + '/' + data;

    return this.http.get(url);
  }

  obtenerProductos(factura: any) {
    const url = LINK + '/cobertura/productos/factura/' + factura;

    return this.http.get(url);
  }

  enviarEmailXml(email: any, xml: any, serie: any, factura: any, cliente: Usuario) {
    const url = PATH_LINK + '/api/clientes.php?opcion=7&email=' + email + '&xml=' + xml + '&factura=' + serie + '-' + factura + '&cliente=' + JSON.stringify(cliente);

    return this.http.get(url);
  }
}
