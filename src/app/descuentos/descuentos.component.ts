import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

// Servicios
import { ShoppingService, UsuarioServicesService } from '../servicios/servicios.index';
import { Producto } from '../modelos/productos.model';

@Component({
  selector: 'app-descuentos',
  templateUrl: './descuentos.component.html',
  styles: []
})
export class DescuentosComponent implements OnInit {

  desc: number = 0;
  descPercent: number = 0;
  productos: any[] = [];
  public precio: number = 3;

  constructor(
    private router: ActivatedRoute,
    private route: Router,
    private _usuarioService: UsuarioServicesService,
    private _shoppingService: ShoppingService
  ) {
    this.desc = Number(this.router.snapshot.paramMap.get('desc'));
    this.descPercent = Number(this.router.snapshot.paramMap.get('desc')) / 100;
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
        this.productos = [];
        this.obtenerProductos();
      } else {
        this.obtenerProductos();
      }
    });
  }

  irA(producto: Producto) {
    // this._webSocket.acciones('producto-visto', producto);
    this.route.navigate(['/ver/', producto.articuloid]);
  }

  obtenerProductos() {
    this._shoppingService.productosDesc(this.desc, this.precio).subscribe((resp: any) => {
      if (resp.status) {
        this.productos = resp.respuesta;
      }
    });
  }

}
