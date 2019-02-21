import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

// Servicios
import { UsuarioServicesService } from '../usuario-servicios/usuario-services.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor (
    private _usuarioService: UsuarioServicesService
  ) {}

  canActivate() {
    if ( this._usuarioService.usuario.rol === 'DIST_ROLE' ) {
      return true;
    } else {
      console.log('Bolqueado por el ADMIN GUARD');
      swal('Sin acceso' , 'No tiene autorizado ingresar en esta sección.', 'error');
      return false;
    }
  }
}
