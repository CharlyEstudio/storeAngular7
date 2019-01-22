import { Component, OnInit } from '@angular/core';
import { DatosService, UsuarioServicesService } from 'src/app/servicios/servicios.index';

@Component({
  selector: 'app-bono',
  templateUrl: './bono.component.html',
  styles: []
})
export class BonoComponent implements OnInit {

  // Gráfica
  lineChartData: Array<any> = [
    {data: [0, 0, 0, 0], label: 'Mes 1'},
    {data: [0, 0, 0, 0], label: 'Mes 2'},
    {data: [0, 0, 0, 0], label: 'Mes 3'}
  ];

  lineChartLabels: Array<any> = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
  lineChartOptions: any = {
    responsive: true
  };

  lineChartColors: Array<any> = [
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    },
    { // dark grey
      backgroundColor: 'rgba(77,83,96,0.2)',
      borderColor: 'rgba(77,83,96,1)',
      pointBackgroundColor: 'rgba(77,83,96,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(77,83,96,1)'
    },
    { // grey
      backgroundColor: 'rgba(148,159,177,0.2)',
      borderColor: 'rgba(148,159,177,1)',
      pointBackgroundColor: 'rgba(148,159,177,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
  ];

  // fecMes1Sem1: any;
  // fecMes1Sem2: any;
  // fecMes1Sem3: any;
  // fecMes1Sem4: any;

  // fecMes2Sem1: any;
  // fecMes2Sem2: any;
  // fecMes2Sem3: any;
  // fecMes2Sem4: any;

  // fecMes3Sem1: any;
  // fecMes3Sem2: any;
  // fecMes3Sem3: any;
  // fecMes3Sem4: any;

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
  trimestreBono: any;

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
    this.trimestreBono = JSON.stringify(this._datoService.trimestreBono(this.mes, this.year));
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

    this._datoService.obtenerComprasTrimestrales(this._usuarioService.usuario.numero, this.trimestreBono).subscribe((compras: any) => {
      console.log(compras);
      let fecMes1Sem1;
      let fecMes1Sem2;
      let fecMes1Sem3;
      let fecMes1Sem4;

      let fecMes2Sem1;
      let fecMes2Sem2;
      let fecMes2Sem3;
      let fecMes2Sem4;

      let fecMes3Sem1;
      let fecMes3Sem2;
      let fecMes3Sem3;
      let fecMes3Sem4;

      if (compras.status) {
        for (let i = 0; i < compras.respuesta.length; i++) {
          if (compras.respuesta[i].mes === 'MES1') {
            fecMes1Sem1 = Number(compras.respuesta[i].cantidad);
            fecMes1Sem2 = Number(compras.respuesta[i].cantidad);
            fecMes1Sem3 = Number(compras.respuesta[i].cantidad);
            fecMes1Sem4 = Number(compras.respuesta[i].cantidad);
            console.log(compras.respuesta[i]);
          }

          if (compras.respuesta[i].mes === 'MES2') {
            fecMes2Sem1 = Number(compras.respuesta[i].cantidad);
            fecMes2Sem2 = Number(compras.respuesta[i].cantidad);
            fecMes2Sem3 = Number(compras.respuesta[i].cantidad);
            fecMes2Sem4 = Number(compras.respuesta[i].cantidad);
            console.log(compras.respuesta[i]);
          }

          if (compras.respuesta[i].mes === 'MES3') {
            fecMes3Sem1 = Number(compras.respuesta[i].cantidad);
            fecMes3Sem2 = Number(compras.respuesta[i].cantidad);
            fecMes3Sem3 = Number(compras.respuesta[i].cantidad);
            fecMes3Sem4 = Number(compras.respuesta[i].cantidad);
            console.log(compras.respuesta[i]);
          }
        }

        this.lineChartData = [
          {data: [fecMes1Sem1, fecMes1Sem2, fecMes1Sem3, fecMes1Sem4], label: 'Mes 1'},
          {data: [fecMes2Sem1, fecMes2Sem2, fecMes2Sem3, fecMes2Sem4], label: 'Mes 2'},
          {data: [fecMes3Sem1, fecMes3Sem2, fecMes3Sem3, fecMes3Sem4], label: 'Mes 3'}
        ];
        console.log(this.lineChartData);
      }
    });
  }

}
