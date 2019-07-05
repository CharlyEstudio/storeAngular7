import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Servicios
import { ProductosService, UsuarioServicesService, WebsocketService } from '../servicios/servicios.index';

// Modelos
import { Producto } from '../modelos/productos.model';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styles: []
})
export class OfertaComponent implements OnInit {

  mejores: any[] = [];
  precarga: any[] = [];
  public precio: number = 3;

  desde: number = 0;

  disabledAnt: boolean = true;
  disabledSig: boolean = false;

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

  obtenerEstrellas() {
    this._productosServices.promotruper(this.precio).subscribe( (mejores: any) => {
      if (mejores.status) {
        this.mejores = mejores.respuesta;
      }
    });
  }

  cambiar(desde: number) {
    this.desde = this.desde + desde;

    if ( this.desde < 0 ) {
      this.disabledAnt = true;
      this.disabledSig = false;
      return;
    } else {
      this.disabledAnt = false;
      this.disabledSig = false;
    }
    this._productosServices.promotruper(this.precio, this.desde).subscribe( (mejores: any) => {
      this.mejores = [];
      this.precarga = Array(8).fill(4);
      if (mejores.status) {
        this.mejores = mejores.respuesta;
        if (this.desde === 0) {
          this.disabledAnt = true;
          this.disabledSig = false;
        }
      }
    });
  }

  irA(producto: Producto) {
    this._webSocket.acciones('producto-visto', producto);
    this.router.navigate(['/ver/', producto.articuloid]);
  }

}
