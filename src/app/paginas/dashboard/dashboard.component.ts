import { Component, OnInit } from '@angular/core';

// Servicios
import { UsuarioServicesService } from 'src/app/servicios/servicios.index';

// Modelos
import { Usuario } from 'src/app/modelos/usuarios.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {
  usuario: Usuario;
  nombre: any;
  menus: any[] = [];

  constructor(
    private _usuarioService: UsuarioServicesService
  ) { }

  ngOnInit() {
    this.menus = this._usuarioService.menu;
    this.usuario = this._usuarioService.usuario;
    this.nombre = this._usuarioService.usuario.nombre;
    console.log(this.menus);
  }

}
