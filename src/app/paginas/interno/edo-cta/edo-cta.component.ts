import { Component, OnInit } from '@angular/core';

// Servicios
import { DatosService, UsuarioServicesService } from 'src/app/servicios/servicios.index';

@Component({
  selector: 'app-edo-cta',
  templateUrl: './edo-cta.component.html',
  styles: []
})
export class EdoCtaComponent implements OnInit {

  logo: string;
  fecha: string;
  numero: string;
  nombre: string;
  idFerrum: number = 0;

  // Estado de Cuenta
  saldo: any[] = [];
  edocta: any[] = [];
  saldoTotal: number = 0;
  saldoVencido: number = 0;
  proximoVenc: number;
  diasProximoVenc: number;

  preSaldo: number = 0;
  cargos: number = 0;
  abonos: number = 0;

  // Primera Fecha de Movimiento Obtenido de la Primera Factura Vigente
  firstDate: string;

  constructor(
    private _datoService: DatosService,
    private _usuarioService: UsuarioServicesService
  ) {
    this.logo = 'http://192.168.1.250/assets/img/logo-min.png';
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

    this.fecha = anio + '-' + mes + '-' + dia;
    this.nombre = this._usuarioService.usuario.nombre;
    this.numero = this._usuarioService.usuario.numero;
    this.idFerrum = Number(this._usuarioService.usuario.idFerrum);
  }

  ngOnInit() {
    this.obtenerSaldo();
  }

  obtenerSaldo() {
    this._datoService.obtenerSaldo(this.fecha, this._usuarioService.usuario.numero).subscribe((saldo: any) => {
      if (saldo.status) {
        this.saldo = saldo.respuesta;
        this.firstDate = saldo.respuesta[0].feccap.substring(0, 10);
        this.proximoVenc = saldo.respuesta[0].folio;
        this.diasProximoVenc = saldo.respuesta[0].dias;

        for (let m = 0; m < saldo.respuesta.length; m++) {
          if (saldo.respuesta[m].vence < this.fecha) {
            this.saldoVencido += saldo.respuesta[m].saldo;
          }
          this.saldoTotal += saldo.respuesta[m].saldo;
        }

        this._datoService.obtenerFacturas(this._usuarioService.usuario.idFerrum, this.firstDate)
            .subscribe( ( edocta: any ) => {

              if (edocta.status) {

                for (let i = 0; i < edocta.respuesta.length; i++) {

                  this.cargos += edocta.respuesta[i].CARGO;

                  this._datoService.obtenerMovimiento(edocta.respuesta[i].DOCID)
                    .subscribe( ( resp: any ) => {

                      if (resp.status) {

                        if (edocta.respuesta[i].DOCID === resp.respuesta[0].DOCID) {

                          for (let k = 0; k < resp.respuesta.length; k++) {

                            if (edocta.respuesta[i].SALDOFINAL > 0) {

                              if (this.preSaldo === 0) {
                                this.preSaldo = edocta.respuesta[i].SALDO - resp.respuesta[k].PAGADO;
                              } else {
                                this.preSaldo = this.preSaldo - resp.respuesta[k].PAGADO;
                              }

                            }

                            const nuevo = [
                              {
                                'DOCID': edocta.respuesta[i].DOCID,
                                'FECHA': resp.respuesta[k].FECHAAPLICADA,
                                'FOLIO': edocta.respuesta[i].FOLIO,
                                'SALDOFINAL': edocta.respuesta[i].SALDOFINAL,
                                'CARGO': '',
                                'ABONO': resp.respuesta[k].PAGADO,
                                'SALDO' : this.preSaldo,
                                'RECIBO': resp.respuesta[k].RECIBO,
                                'TIPO': resp.respuesta[k].FORMAPAGO,
                                'FP': resp.respuesta[k].FP,
                                'NOTA': resp.respuesta[k].NOTA,
                                'TOTALPAGADO': edocta.respuesta[i].TOTALPAGADO
                              }
                            ];

                            this.abonos += resp.respuesta[k].PAGADO;

                            if (k === 0) {

                              this.edocta.push(edocta.respuesta[i]);

                            }

                            this.edocta.push(nuevo[0]);

                          }

                          this.preSaldo = 0;

                        }

                      } else {

                        this.edocta.push(edocta.respuesta[i]);

                      }

                    });

                }

              }

            });
      } else {
        this.saldo = [];
        this.firstDate = '00-00-0000';
      }
    });
  }

  modalFolio(saldo: any, numero: any) {
    console.log(saldo, numero);
  }

}
