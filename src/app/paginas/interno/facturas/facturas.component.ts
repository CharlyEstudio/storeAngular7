import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

// Servicios
import { UsuarioServicesService, DatosService, ExportarService } from 'src/app/servicios/servicios.index';

@Component({
  selector: 'app-facturas',
  templateUrl: './facturas.component.html',
  styles: []
})
export class FacturasComponent implements OnInit {

  saldo: any[] = [];

  fecha: any;
  fechaFinal: any;
  dia: any;
  mes: any;
  year: any;

  factura: number = 0;
  serie: string;
  fechaFactura: string;
  importe: number;

  doc: any;
  xml: any;
  pdf: any;
  ext: string;

  constructor(
    public sanitizer: DomSanitizer,
    private _datoService: DatosService,
    private _usuarioService: UsuarioServicesService,
    private _exportar: ExportarService
  ) {
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

    this.dia = dia;
    this.mes = mes;
    this.year = h.getFullYear();

    this.fecha = this.year + '-' + mes + '-' + dia;
    this.fechaFinal = this.year + '-' + mes + '-01';
  }

  ngOnInit() {
    this.obtenerFacturas();
  }

  obtenerFacturas() {
    this._datoService.obtenerFacturasMes(this._usuarioService.usuario.idFerrum, this.fechaFinal, this.fecha).subscribe((saldo: any) => {
      if (saldo.status) {
        this.saldo = saldo.respuesta;
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

    switch (ext) {
      case 'pdf':
        const carpeta = String(arregloFecha[0] + arregloFecha[1]);
        const file = String(arregloFecha[0] + arregloFecha[1] + dia[0] + '-' + factura.SERIE.toLowerCase() + factura.FOLIO + '.' + ext);
        this.pdf = carpeta + '/' + file;
      break;
      case 'xml':
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

}
