import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Servicios
import { UsuarioServicesService } from '../usuario-servicios/usuario-services.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    public router: Router,
    private _usuarioService: UsuarioServicesService
  ) {}

  canActivate() {
    this._usuarioService.cargarStorage();
    if ( this._usuarioService.estaLogueado() ) {
      return true;
    } else {
      this.router.navigate(['/inicio']);
      return false;
    }
  }
}
