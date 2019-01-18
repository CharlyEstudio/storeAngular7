import { Component, OnInit } from '@angular/core';
import { DatosService, UsuarioServicesService } from 'src/app/servicios/servicios.index';

@Component({
  selector: 'app-bono',
  templateUrl: './bono.component.html',
  styles: []
})
export class BonoComponent implements OnInit {

  fecha: string;
  mes: number;
  year: number;

  numero: string;
  nombre: string;
  idFerrum: number = 0;

  saldoTotal: number = 0;
  saldoVencido: number = 0;
  numVenc: number = 0;

  compras: number = 0;

  // Primera Fecha del trimestre
  firstDate: string;

  constructor(
    private _datoService: DatosService,
    private _usuarioService: UsuarioServicesService
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

    this.mes = (h.getMonth() + 1);

    this.year = h.getFullYear();

    this.fecha = this.year + '-' + mes + '-' + dia;
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
        for (let m = 0; m < saldo.respuesta.length; m++) {
          if (saldo.respuesta[m].vence < this.fecha) {
            this.saldoVencido += saldo.respuesta[m].saldo;
            if (this.numVenc > 0) {
              this.numVenc ++;
            } else {
              this.numVenc = 1;
            }
          }
          this.saldoTotal += saldo.respuesta[m].saldo;
        }
      }
    });

    this._datoService.fechaTrimestre(this.mes, this.year).map((fechas: any) => {
      this.firstDate = fechas.mesInicio;
      this._datoService.compras(this._usuarioService.usuario.numero, fechas.mesInicio, fechas.mesFinal).subscribe((compras: any) => {
        if (compras.status) {
          this.compras = compras.respuesta[0].compra;
        }
      });
    });
  }

}
