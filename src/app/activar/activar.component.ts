import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

// Servicios
import { UsuarioServicesService } from '../servicios/servicios.index';

@Component({
  selector: 'app-activar',
  templateUrl: './activar.component.html',
  styles: []
})
export class ActivarComponent implements OnInit {

  activo: boolean = false;
  alerta: boolean = false;
  token: any = '';
  mensaje: any = '';

  forma: FormGroup;

  constructor(
    public activateRoute: ActivatedRoute,
    public router: Router,
    private usuarioService: UsuarioServicesService
  ) {
    activateRoute.params
      .subscribe( params => {
        if (!params['token']) {
          this.router.navigate(['/login']);
        } else {
          this.token = params['token'];
          this.validar(params['token']);
          setTimeout(() => this.router.navigate(['/acceso']), 2000);
        }
      });
  }

  validar(token: any) {
    this.usuarioService.validarToken(token).subscribe((resp: any) => {
      this.activo = resp.ok;
    });
  }

  ngOnInit() { }

}
