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

  mes1: any;
  cantMes1: number = 0;
  promMes1: number = 0;
  mes2: any;
  cantMes2: number = 0;
  promMes2: number = 0;
  mes3: any;
  cantMes3: number = 0;
  promMes3: number = 0;

  pasaCompras: boolean = false;
  pasaComision: boolean = false;

  lineChartLabels: Array<any> = ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'];
  lineChartOptions: any = {
    responsive: true
  };

  lineChartColors: Array<any> = [
    { // rojo
      backgroundColor: 'rgba(206, 52, 76,0.2)', // fondo
      borderColor: 'rgba(206, 52, 76,1)', // puntos
      pointBackgroundColor: 'rgba(206, 52, 76,1)',
      pointBorderColor: '#fff', // bordes
      pointHoverBackgroundColor: '#fff', // bordes
      pointHoverBorderColor: 'rgba(206, 52, 76,0.8)' // línea
    },
    { // azul
      backgroundColor: 'rgba(52, 136, 206,0.2)',
      borderColor: 'rgba(52, 136, 206,1)',
      pointBackgroundColor: 'rgba(52, 136, 206,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(52, 136, 206,1)'
    },
    { // grey
      backgroundColor: 'rgba(101, 106, 102,0.2)',
      borderColor: 'rgba(101, 106, 102,1)',
      pointBackgroundColor: 'rgba(101, 106, 102,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(101, 106, 102,0.8)'
    }
  ];

  fec: number = Date.now();

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
    this.mes1 = this._datoService.trimestreBono(this.mes, this.year).mes1;
    this.mes2 = this._datoService.trimestreBono(this.mes, this.year).mes2;
    this.mes3 = this._datoService.trimestreBono(this.mes, this.year).mes3;
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
            if (compras.respuesta[i].semana === 'SEMANA1') {
              fecMes1Sem1 = Number(compras.respuesta[i].cantidad);
            } else if (compras.respuesta[i].semana === 'SEMANA2') {
              fecMes1Sem2 = Number(compras.respuesta[i].cantidad);
            } else if (compras.respuesta[i].semana === 'SEMANA3') {
              fecMes1Sem3 = Number(compras.respuesta[i].cantidad);
            } else if (compras.respuesta[i].semana === 'SEMANA4') {
              fecMes1Sem4 = Number(compras.respuesta[i].cantidad);
            }
            this.cantMes1 += Number(compras.respuesta[i].cantidad);
          }

          if (compras.respuesta[i].mes === 'MES2') {
            if (compras.respuesta[i].semana === 'SEMANA1') {
              fecMes2Sem1 = Number(compras.respuesta[i].cantidad);
            } else if (compras.respuesta[i].semana === 'SEMANA2') {
              fecMes2Sem2 = Number(compras.respuesta[i].cantidad);
            } else if (compras.respuesta[i].semana === 'SEMANA3') {
              fecMes2Sem3 = Number(compras.respuesta[i].cantidad);
            } else if (compras.respuesta[i].semana === 'SEMANA4') {
              fecMes2Sem4 = Number(compras.respuesta[i].cantidad);
            }
            this.cantMes2 += Number(compras.respuesta[i].cantidad);
          }

          if (compras.respuesta[i].mes === 'MES3') {
            if (compras.respuesta[i].semana === 'SEMANA1') {
              fecMes3Sem1 = Number(compras.respuesta[i].cantidad);
            } else if (compras.respuesta[i].semana === 'SEMANA2') {
              fecMes3Sem2 = Number(compras.respuesta[i].cantidad);
            } else if (compras.respuesta[i].semana === 'SEMANA3') {
              fecMes3Sem3 = Number(compras.respuesta[i].cantidad);
            } else if (compras.respuesta[i].semana === 'SEMANA4') {
              fecMes3Sem4 = Number(compras.respuesta[i].cantidad);
            }
            this.cantMes3 += Number(compras.respuesta[i].cantidad);
          }
        }

        if (fecMes1Sem1 > 0) {
          this.promMes1 += 1;
        }

        if (fecMes1Sem2 > 0) {
          this.promMes1 += 1;
        }

        if (fecMes1Sem3 > 0) {
          this.promMes1 += 1;
        }

        if (fecMes1Sem4 > 0) {
          this.promMes1 += 1;
        }

        if (fecMes2Sem1 > 0) {
          this.promMes2 += 1;
        }

        if (fecMes2Sem2 > 0) {
          this.promMes2 += 1;
        }

        if (fecMes2Sem3 > 0) {
          this.promMes2 += 1;
        }

        if (fecMes2Sem4 > 0) {
          this.promMes2 += 1;
        }

        if (fecMes3Sem1 > 0) {
          this.promMes3 += 1;
        }

        if (fecMes3Sem2 > 0) {
          this.promMes3 += 1;
        }

        if (fecMes3Sem3 > 0) {
          this.promMes3 += 1;
        }

        if (fecMes3Sem4 > 0) {
          this.promMes3 += 1;
        }

        if (2 >= this.promMes1 && 2 >= this.promMes2 && 2 >= this.promMes3) {
          this.pasaCompras = true;
        } else {
          this.pasaCompras = false;
        }

        this.lineChartData = [
          {data: [fecMes1Sem1, fecMes1Sem2, fecMes1Sem3, fecMes1Sem4], label: this.mes1},
          {data: [fecMes2Sem1, fecMes2Sem2, fecMes2Sem3, fecMes2Sem4], label: this.mes2},
          {data: [fecMes3Sem1, fecMes3Sem2, fecMes3Sem3, fecMes3Sem4], label: this.mes3}
        ];

        if (this.compras >= 20000 && this.numVenc === 0 && this.pasaCompras) {
          this.pasaComision = true;
        } else {
          this.pasaComision = false;
        }

      }
    });
  }

}
