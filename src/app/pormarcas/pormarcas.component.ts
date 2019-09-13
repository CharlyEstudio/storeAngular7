import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

// Modelos
import { Producto } from '../modelos/productos.model';

// Servicios
import { UsuarioServicesService, ProductosService, WebsocketService } from '../servicios/servicios.index';

@Component({
  selector: 'app-pormarcas',
  templateUrl: './pormarcas.component.html',
  styles: []
})
export class PormarcasComponent implements OnInit {

  marca: any = '';
  buscar: any;
  nombre: any;
  productos: any[] = [];
  precarga: any[] = [];

  public precio: number = 3;

  desde: number = 0;

  // disabledAnt: boolean = true;
  disabledSig: boolean = true;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private _usuarioService: UsuarioServicesService,
    private _productosService: ProductosService,
    private _ws: WebsocketService
  ) {
    this.route.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.productos = [];
        this.precarga = Array(8).fill(4);
        this.marca = this.router.snapshot.paramMap.get('familia');
        this.nombre = this.router.snapshot.paramMap.get('nombre');
        const b = this.router.snapshot.paramMap.get('buscar');
        this.buscar = b.split('/')[6];

        if (this._usuarioService.usuario !== null) {
          this.precio = this._usuarioService.usuario.precio;
        } else {
          this.precio = 3;
        }
        this.obtenerProductos();
      }
    });
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
        // this.obtenerProductos();
      } else {
        // this.obtenerProductos();
      }
    });
  }

  obtenerProductos() {
    this._productosService.obtenerProductosPorMarca(this.buscar, this.precio).subscribe((prod: any) => {
      if (prod.status) {
        this.productos = prod.respuesta;
        this.precarga = [];
        // if (prod.respuesta.length > 12) {
        //   this.disabledAnt = true;
        //   this.disabledSig = false;
        // } else if (prod.respuesta.length < 12) {
        //   this.disabledAnt = true;
        //   this.disabledSig = true;
        // }
      }
    });
  }

  cambiar(desde: number) {
    this.desde = this.desde + desde;

    // if ( this.desde < 0 ) {
    //   this.disabledAnt = true;
    //   this.disabledSig = false;
    //   return;
    // } else {
    //   this.disabledAnt = false;
    //   this.disabledSig = false;
    // }
    this._productosService.obtenerProductosPorMarca(this.buscar, this.precio, this.desde).subscribe( (prod: any) => {
    // this._productosService.obtenerProductosPorMarca(this.marca, this.precio).subscribe( (prod: any) => {
      const arraySave = this.productos;
      this.productos = [];
      this.precarga = Array(8).fill(4);
      if (prod.status) {
        this.productos = arraySave;
        for (const art of prod.respuesta) {
          this.productos.push(art);
        }
        this.disabledSig = true;
      } else {
        this.productos = arraySave;
        this.disabledSig = false;
      }
    });
  }

  irA(producto: Producto) {
    this._ws.acciones('producto-visto', producto);
    this.route.navigate(['/ver/', producto.articuloid]);
  }

}
