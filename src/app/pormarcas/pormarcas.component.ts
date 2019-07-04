import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

// Modelos
import { Producto } from '../modelos/productos.model';

// Servicios
import { UsuarioServicesService, ProductosService } from '../servicios/servicios.index';

@Component({
  selector: 'app-pormarcas',
  templateUrl: './pormarcas.component.html',
  styles: []
})
export class PormarcasComponent implements OnInit {

  marca: any = '';
  productos: any[] = [];
  precarga: any[] = [];

  public precio: number = 3;

  desde: number = 0;

  disabledAnt: boolean = true;
  disabledSig: boolean = false;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private _usuarioService: UsuarioServicesService,
    private _productosService: ProductosService
  ) {
    this.route.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.productos = [];
        this.marca = '';
        this.precarga = Array(8).fill(4);
        this.marca = this.router.snapshot.paramMap.get('prod');

        if (this._usuarioService.usuario !== null) {
          this.precio = this._usuarioService.usuario.precio;
        } else {
          this.precio = 3;
        }
        this.obtenerProductos();
      }
    });
    this.marca = this.router.snapshot.paramMap.get('prod');
    this.precarga = Array(8).fill(4);
  }

  ngOnInit() {
    this._usuarioService.isSession().subscribe(login => {
      if (login.length === 0) {
        if (this._usuarioService.usuario !== null) {
          this.precio = this._usuarioService.usuario.precio;
        } else {
          this.precio = 3;
        }
        this.productos = [];
        this.obtenerProductos();
      } else {
        this.obtenerProductos();
      }
    });
  }

  obtenerProductos() {
    this._productosService.obtenerProductosPorMarca(this.marca, this.precio).subscribe((prod: any) => {
      if (prod.status) {
        this.productos = prod.respuesta;
        this.precarga = [];
        if (prod.respuesta.length > 12) {
          this.disabledAnt = true;
          this.disabledSig = false;
        } else if (prod.respuesta.length < 12) {
          this.disabledAnt = true;
          this.disabledSig = true;
        }
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
    this._productosService.obtenerProductosPorMarca(this.marca, this.precio, this.desde).subscribe( (prod: any) => {
      this.productos = [];
      this.precarga = Array(8).fill(4);
      if (prod.status) {
        this.productos = prod.respuesta;
        if (this.desde === 0) {
          this.disabledAnt = true;
          this.disabledSig = false;
        } else if (this.productos.length < 11) {
          this.disabledAnt = false;
          this.disabledSig = true;
        }
      }
    });
  }

  irA(producto: Producto) {
    // this._webSocket.acciones('producto-visto', producto);
    this.route.navigate(['/ver/', producto.articuloid]);
  }

}
