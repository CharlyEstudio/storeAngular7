import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Modelos
import { Producto } from '../../modelos/productos.model';

// Link
import { PATH_LINK } from '../../config/config';

// Servicios
import { ProductosService, UsuarioServicesService, WebsocketService } from 'src/app/servicios/servicios.index';

@Component({
  selector: 'app-venta-dia',
  templateUrl: './venta-dia.component.html',
  styles: []
})
export class VentaDiaComponent implements OnInit {

  mejores: any[] = [];
  precarga: any[] = [];
  public precio: number = 3;

  constructor(
    private _productosServices: ProductosService,
    private _usuarioService: UsuarioServicesService,
    private router: Router,
    private _webSocket: WebsocketService
  ) {
    this.precarga = Array(8).fill(4);
    if (this._usuarioService.usuario !== null) {
      this.precio = this._usuarioService.usuario.precio;
    }
  }

  ngOnInit() {
    this._usuarioService.isSession().subscribe(login => {
      if (login.length === 0) {
        if (this._usuarioService.usuario !== null) {
          this.precio = this._usuarioService.usuario.precio;
        } else {
          this.precio = 3;
        }
        this.mejores = [];
        this.obtenerEstrellas();
      } else {
        this.obtenerEstrellas();
      }
    });
  }

  irA(producto: Producto) {
    // this._webSocket.acciones('producto-visto', producto);
    this.router.navigate(['/ver/', producto.articuloid]);
  }

  obtenerEstrellas() {
    this._productosServices.obtenerMejoresVentasDia(this.precio).subscribe( (mejores: any) => {
      if (mejores.status) {
        this.mejores = mejores.respuesta;
      }
    });
  }

}
