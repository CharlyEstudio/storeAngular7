import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Alertas
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Servicios
import { UsuarioServicesService, DatosService, ExportarService } from 'src/app/servicios/servicios.index';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styles: []
})
export class FacturasComponent implements OnInit {

  saldo: any[] = [];
  selectMes: any[] = [];
  seleccionarMes: any = '0';

  fecha: any;
  fechaFinal: any;
  dia: any;
  mes: any;
  year: any;

  factura: number = 0;
  serie: string;
  fechaFactura: string;
  importe: number;
  sindato: boolean = false;

  doc: any;
  xml: any;
  xmlFile: any;
  pdf: any;
  ext: string;
  email: string;

  constructor(
    public sanitizer: DomSanitizer,
    private _datoService: DatosService,
    private _usuarioService: UsuarioServicesService,
    private _exportar: ExportarService
  ) {
    const h = new Date();
    const mesInt = h.getMonth() + 1;

    let indiceMes = 12;
    for (let i = 0; i < 13; i++) {
      let agregarMes;
      if (i === 0) {
        agregarMes = {
          indice: i,
          mes: mesInt,
          year: h.getFullYear()
        };
      } else {
        if ((mesInt - i) > 0) {
          agregarMes = {
            indice: i,
            mes: (mesInt - i),
            year: h.getFullYear()
          };
        } else {
          agregarMes = {
            indice: i,
            mes: indiceMes,
            year: h.getFullYear() - 1
          };
          indiceMes--;
        }
      }
      this.selectMes.push(agregarMes);
    }
    this.seleccionarMes = this.selectMes[0];
  }

  ngOnInit() {
    this.obtenerFacturas();
  }

  obtenerFacturas(valor: any = '') {
    this.saldo = [];
    this.sindato = false;
    let mes;
    if (this.seleccionarMes.mes < 10) {
      mes = '0' + this.seleccionarMes.mes;
    } else {
      mes = this.seleccionarMes.mes;
    }
    const diaFinal = new Date(this.seleccionarMes.year, this.seleccionarMes.mes, 0).getDate();
    this.fecha = this.seleccionarMes.year + '-' + mes + '-' + diaFinal;
    this.fechaFinal = this.seleccionarMes.year + '-' + mes + '-01';
    this._datoService.obtenerFacturasMes(this._usuarioService.usuario.idFerrum, this.fechaFinal, this.fecha).subscribe((saldo: any) => {
      if (saldo.status) {
        this.saldo = saldo.respuesta;
        this.sindato = false;
      } else {
        this.sindato = true;
      }
    });
  }

  descargarFile(factura: any, ext: any) {
    const fecha = factura.FECHA;
    const arregloFecha = fecha.split('-', 3);
    const dia = arregloFecha[2].split('T', 1);
    this.ext = ext;
    this.factura = factura.FOLIO;
    this.serie = factura.SERIE;
    this.fechaFactura = factura.FECHA;
    this.importe = factura.TOTAL;

    let carpeta;
    let file;

    switch (ext) {
      case 'pdf':
        let extension;
        if (this.seleccionarMes.year >= 2019) {
          if (this.seleccionarMes.mes >= 6) {
            extension = 'xml.def.' + ext;
          } else {
            extension = ext;
          }
        } else {
          extension = ext;
        }
        carpeta = String(arregloFecha[0] + arregloFecha[1]);
        file = String(arregloFecha[0] + arregloFecha[1] + dia[0] + '-' + factura.SERIE.toLowerCase() + factura.FOLIO + '.' + extension);
        this.pdf = carpeta + '/' + file;
      break;
      case 'xml':
        carpeta = String(arregloFecha[0] + arregloFecha[1]);
        file = String(arregloFecha[0] + arregloFecha[1] + dia[0] + '-' + factura.SERIE.toLowerCase() + factura.FOLIO + '.' + ext);
        this.xmlFile = carpeta + '/' + file;
        this.xml = factura.XML;
      break;
    }
  }

  exportar(data: any, serie: any, factura: any, tipo: any) {
    const fileName = `${serie}${factura}`;
    const file = Array({
      data: data
    });
    this._exportar.exportAsFile(file, fileName, tipo);
  }

  enviarEmail(xml: any, serie: any, factura: any) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (this.email === undefined) {
      swal('Error', 'Debe de ingresar un correo.', 'error');
      return;
    }

    if (!re.test(this.email)) {
      swal('Error', 'Debe de ingresar un correo valido.', 'error');
      return;
    }

    this._datoService.enviarEmailXml(this.email, xml, serie, factura, this._usuarioService.usuario).subscribe((resp: any) => {
      if (resp[0].status) {
        swal('Enviado!', 'El correo fue enviado correctamente a ' + this.email, 'success');
      } else {
        swal('Error', 'No se pudo enviar el correo al destinatario ' + this.email, 'error');
      }
    });
  }

}
