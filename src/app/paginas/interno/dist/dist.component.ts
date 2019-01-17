import { Component, OnInit, ɵConsole } from '@angular/core';

// Servicios
import { UsuarioServicesService, DatosService } from 'src/app/servicios/servicios.index';

import { Usuario } from 'src/app/modelos/usuarios.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Component({
  selector: 'app-dist',
  templateUrl: './dist.component.html',
  styles: []
})
export class DistComponent implements OnInit {

  usuario: Usuario;

  // Datos del Usuario si es Distribuidor
  nombre: string;
  numero: string;
  activo: string;
  zona: string;
  lista: string;
  empresa: string;
  rfc: string;
  domicilio: string;
  colonia: string;
  ciudad: string;
  limite: number = 0;
  saldo: number = 0;
  saldoDispo: number = 0;
  saldoVenc: number = 0;
  diasCred: number = 0;
  ultimaCompra: string;

  asesor: string;
  emailAsesor: string;
  telAsesor: string;

  // Si tiene por vencer
  texto: string = 'Sin Vencimiento';
  folio: number = 0;
  vence: string;
  saldoPorVencer: number = 0;
  restan: number = 0;

  constructor(
    private _usuarioService: UsuarioServicesService,
    private _datosService: DatosService
  ) {
    this.usuario = this._usuarioService.usuario;
    this.obtenerDatos();
  }

  ngOnInit() {
  }

  obtenerDatos() {
    this._datosService.obtenerClienteFerrum(this.usuario.numero).subscribe((datos: any) => {
      const data = datos.respuesta[0];

      this.nombre = data.NOMBRE;
      this.numero = data.EXTERNO;
      this.zona = data.ZONA;
      // this.lista = data.LISTA;
      this.empresa = data.NOMBRECOM;
      this.rfc = data.RFC;
      this.colonia = data.COLONIA;
      this.ciudad = data.CIUDAD;
      this.limite = data.LIMITE;
      this.saldo = data.SALDO;
      this.diasCred = data.DIACREDITO;
      this.ultimaCompra = data.ULTCOM;

      if (data.LISTA === 1) {
        this.lista = 'DIST';
      } else if (data.LISTA === 2) {
        this.lista = 'SUBDIST';
      } else if (data.LISTA === 3) {
        this.lista = 'MAYOREO';
      }

      this.domicilio = data.DIRECCION + ' ' + data.NUMERO + ' ' + data.INTERIOR;

      if (data.ACTIVO === 'S') {
        this.activo = 'ACTIVO';
      } else {
        this.activo = 'INACTIVO';
      }

      this.saldoDispo = this.limite - this.saldo;

      const salVen = this.limite - this.saldo;
      if (salVen < 0) {
        this.saldoVenc = salVen;
      } else {
        this.saldoVenc = 0;
      }

      this.asesor = data.ASESOR;
      this.emailAsesor = 'user@ferremayoristas.com.mx';
      this.telAsesor = '442 000 0000';
      console.log(data);
    });
  }

}
