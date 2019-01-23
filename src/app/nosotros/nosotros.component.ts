import { Component, OnInit } from '@angular/core';

// Servicios
import { UsuarioServicesService } from '../servicios/servicios.index';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styles: []
})
export class NosotrosComponent implements OnInit {

  conetado: boolean = false;

  constructor(
    private _usuarioService: UsuarioServicesService
  ) {
    if (this._usuarioService.estaLogueado()) {
      this.conetado = true;
    } else {
      this.conetado = false;
    }
  }

  ngOnInit() {
  }

}
