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

  desde: number = 0;
  disabledAnt: boolean = true;
  disabledSig: boolean = false;

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
    // Buscar producto por select
    // this._productosService.buscarProductosID(buscar, this.precio).subscribe((encontrado: any) => {
    //   if (encontrado.status) {
    //     this.encontrado = encontrado.respuesta;
    //     this.buscandoBol = false;
    //     this.errorBol = false;
    //     this.encontradoBol = true;
    //   } else {
    //     this.msg = encontrado.msg;
    //     this.encontrado = [];
    //     this.buscandoBol = false;
    //     this.errorBol = true;
    //     this.encontradoBol = false;
    //   }
    // });

    // Buscar producto por input
    this._productosService.buscarProductos(buscar, this.precio, this.desde).subscribe((encontrado: any) => {
      if (encontrado.status) {
        this.encontrado = encontrado.respuesta;
        this.buscandoBol = false;
        this.errorBol = false;
        this.encontradoBol = true;
        if (encontrado.respuesta.length > 12) {
          this.disabledAnt = true;
          this.disabledSig = false;
        } else if (encontrado.respuesta.length < 11) {
          this.disabledAnt = true;
          this.disabledSig = true;
        }
      } else {
        this.msg = encontrado.msg;
        this.encontrado = [];
        this.buscandoBol = false;
        this.errorBol = true;
        this.encontradoBol = false;
      }
    }, err => console.log(err.message));
  }

  cambiar(desde: number) {
    this.encontrado = [];
    this.buscandoBol = true;
    this.errorBol = false;
    this.encontradoBol = false;
    this.desde = this.desde + desde;

    if ( this.desde < 0 ) {
      this.disabledAnt = true;
      this.disabledSig = false;
      return;
    } else {
      this.disabledAnt = false;
      this.disabledSig = false;
    }
    this._productosService.buscarProductos(this.buscando, this.precio, this.desde).subscribe( (encontrado: any) => {
      this.encontrado = [];
      if (encontrado.status) {
        this.encontrado = encontrado.respuesta;
        this.buscandoBol = false;
        this.errorBol = false;
        this.encontradoBol = true;
        if (this.desde === 0) {
          this.disabledAnt = true;
          this.disabledSig = false;
        } else if (this.encontrado.length < 12) {
          this.disabledAnt = false;
          this.disabledSig = true;
        }
      }
    });
  }

  irA(producto: Producto) {
    this._webSocket.acciones('producto-visto', producto);
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
