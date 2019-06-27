import { Component, OnInit } from '@angular/core';

// Servicios
import { UsuarioServicesService } from 'src/app/servicios/servicios.index';
import { AccesoService } from '../../acceso/acceso.service';
import { SalirService } from '../nav-principal/salir.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styles: []
})
export class FooterComponent implements OnInit {

  conectado: boolean = false;

  constructor(
    private _usuarioService: UsuarioServicesService,
    private _accesoService: AccesoService,
    private _salirService: SalirService
  ) {
    if (this._usuarioService.estaLogueado()) {
      this.conectado = true;
    } else {
      this.conectado = false;
    }
    this._accesoService.notificacion
      .subscribe((resp: any) => {
        if (resp) {
          this.conectado = true;
        } else {
          this.conectado = false;
        }
      });
    this._salirService.notificacion
      .subscribe((resp: any) => {
        if (resp) {
          this.conectado = false;
        } else {
          this.conectado = true;
        }
      });
  }

  ngOnInit() {
  }

}
