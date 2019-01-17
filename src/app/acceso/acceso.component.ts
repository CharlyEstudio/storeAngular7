import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

// Servicios
import { UsuarioServicesService } from '../servicios/servicios.index';

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
  recuerdame = false;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioServicesService,
  ) {
    this.email = localStorage.getItem('email') || '';

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

    this._usuarioService.iniciar(usuario);

    this._usuarioService.login(usuario, forma.value.recuerdame).subscribe((resp: any) => {
      if (resp.status) {
        this._usuarioService.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu, resp.usuario.rol);
        this.router.navigate(['/compras']);
        // this.wsService.login( 'web', forma.value.email, null, this._usuarioService.usuario.rol );
      } else {
        swal('Error de Login', resp.mensaje, 'error');
      }
    });
  }

}
