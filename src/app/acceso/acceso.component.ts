import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// Servicios
import { UsuarioServicesService, DatosService } from '../servicios/servicios.index';

// Modelos
import { Usuario } from '../modelos/usuarios.model';

@Component({
  selector: 'app-acceso',
  templateUrl: './acceso.component.html',
  styles: []
})
export class AccesoComponent implements OnInit {

  email: any;
  password: any;
  saldoVenc: number = 0;
  vigente: boolean = false;
  recuerdame: boolean = false;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioServicesService,
    private _datosService: DatosService
  ) {
    this.email = localStorage.getItem('emailStore') || '';

    if ( this.email.length > 1) {
      this.recuerdame = true;
    }
  }

  ngOnInit() {
  }

  ingresar(forma: NgForm) {
    if ( forma.invalid ) {
      return;
    }

    const usuario = new Usuario( null, forma.value.email, forma.value.password, null );

    this._usuarioService.login(usuario, forma.value.recuerdame).subscribe((resp: any) => {
      if (resp.status) {
        const fecha = this._usuarioService.fechaActual();
        this._datosService.obtenerSaldo(fecha, resp.usuario.numero).subscribe((saldo: any) => {
          if (saldo.respuesta) {

            for (let m = 0; m < saldo.respuesta.length; m++) {
              if (saldo.respuesta[m].vence < fecha) {
                this.saldoVenc += saldo.respuesta[m].saldo;
              }
            }

            if (this.saldoVenc > 0) {
              this._usuarioService.superheros(resp.usuario.numero).subscribe((supers: any) => {
                this.vigente = supers.status;
                this._usuarioService.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu, resp.usuario.rol, this.vigente);
              });
            } else {
              this.vigente = true;
              this._usuarioService.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu, resp.usuario.rol, this.vigente);
            }
          } else {
            this.vigente = true;
            this._usuarioService.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu, resp.usuario.rol, this.vigente);
          }

          this._usuarioService.iniciar(usuario);
          this.router.navigate(['/dist']);
          // this.wsService.login( 'web', forma.value.email, null, this._usuarioService.usuario.rol );
        });
      } else {
        swal('Error de Login', resp.mensaje, 'error');
      }
    });
  }

}
