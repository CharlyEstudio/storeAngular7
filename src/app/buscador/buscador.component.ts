import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

// Modelos
import { Producto } from '../modelos/productos.model';

// Config
import { PATH_LINK } from '../config/config';

// Servicios
import { ProductosService, UsuarioServicesService, WebsocketService } from 'src/app/servicios/servicios.index';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: []
})
export class BuscadorComponent implements OnInit, OnDestroy {

  precio: number = 3;

  buscando: any;
  buscandoBol = true;
  errorBol = false;
  encontrado: any[] = [];
  encontradoBol = false;
  msg: string;

  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private _productosService: ProductosService,
    private _usuarioService: UsuarioServicesService,
    private _webSocket: WebsocketService
  ) {
    if (this._usuarioService.usuario !== null) {
      this.precio = this._usuarioService.usuario.precio;
    }

    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.buscando = this.activateRoute.snapshot.params.buscando;
        this.obtenerBusqueda(this.buscando);
      } else {
        this.buscando = '';
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.buscando = '';
  }

  obtenerBusqueda(buscar: any) {
    this.encontrado = [];
    this.errorBol = false;
    this.buscandoBol = true;
    this._productosService.buscarProductos(buscar, this.precio).subscribe((encontrado: any) => {
      if (encontrado.status) {
        this.encontrado = encontrado.respuesta;
        this.buscandoBol = false;
        this.errorBol = false;
        this.encontradoBol = true;
      } else {
        this.msg = encontrado.msg;
        this.encontrado = [];
        this.buscandoBol = false;
        this.errorBol = true;
        this.encontradoBol = false;
      }
    });
  }

  irA(producto: Producto) {
    // this._webSocket.acciones('producto-visto', producto);
    this.route.navigate(['/ver/', producto.articuloid]);
  }

  comeBack() {
    window.history.back();
  }

  ordernar(valor: any) {
    const orden = Number(valor);
    if (orden === 1) {
      this.encontrado.sort((a, b) => {
        if (a.precio < b.precio) {
          return 1;
        }

        if (a.precio > b.precio) {
          return -1;
        }

        return 0;
      });
    } else if (orden === 2) {
      this.encontrado.sort((a, b) => {
        if (a.precio > b.precio) {
          return 1;
        }

        if (a.precio < b.precio) {
          return -1;
        }

        return 0;
      });
    }
  }

}
