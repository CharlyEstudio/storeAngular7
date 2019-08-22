import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// Servicios
import { UsuarioServicesService } from '../servicios/servicios.index';
import { AccesoService } from './acceso.service';

// Modelos
import { Usuario } from '../modelos/usuarios.model';

// Alertas
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styles: []
})
export class AccesoComponent implements OnInit {

  numero: any;
  password: any;
  saldoVenc: number = 0;
  vigente: boolean = false;
  recuerdame: boolean = false;
  iniciar: boolean = false;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioServicesService,
    private _accesoService: AccesoService
  ) {
    this.numero = localStorage.getItem('clienteStore') || '';

    if ( this.numero.length > 1) {
      this.recuerdame = true;
    }
  }

  ngOnInit() {
  }

  ingresar(forma: NgForm) {
    if ( forma.invalid ) {
      return;
    }

    this.iniciar = true;

    const usuario = new Usuario( null, forma.value.numero, forma.value.password );

    this._usuarioService.login(usuario, forma.value.recuerdame).subscribe((resp: any) => {
      if (resp.status) {
        this._accesoService.notificacion.emit(true);
        this.router.navigate(['/dist']);
      } else {
        this._accesoService.notificacion.emit(false);
        swal('Error de Login', resp.mensaje, 'error');
      }
      this.iniciar = false;
    }, err => {
      this._accesoService.notificacion.emit(false);
      swal('Error', 'Error.', 'error');
      console.log(err);
    });
  }

}
