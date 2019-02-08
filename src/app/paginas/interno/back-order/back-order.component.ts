import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Servicios
import { UsuarioServicesService, ProductosService, ShoppingService } from 'src/app/servicios/servicios.index';

// Links
import { PATH_LINK } from 'src/app/config/config';

// Modelos
import { Producto } from 'src/app/modelos/productos.model';

@Component({
  selector: 'app-back-order',
  templateUrl: './back-order.component.html',
  styles: []
})
export class BackOrderComponent implements OnInit {

  precio: number = 3;
  inicio: string;
  final: string;
  numero: string;
  sindato: boolean = false;

  backOrder: any[] = [];

  constructor(
    private route: Router,
    private _usuarioService: UsuarioServicesService,
    private _productoService: ProductosService,
    private _shoppingService: ShoppingService
  ) {
    const h = new Date();

    let dia;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    let mes;

    if (h.getMonth() < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    const anio = h.getFullYear();

    if (this._usuarioService.usuario !== null) {
      this.precio = this._usuarioService.usuario.precio;
    }
    this.numero = this._usuarioService.usuario.numero;
    this.inicio = anio + '-' + mes + '-01';
    this.final = anio + '-' + mes + '-' + dia;
  }

  ngOnInit() {
    this.obtenerBackOrder();
  }

  obtenerBackOrder() {
    this._productoService.obtenerBackOrder(this.numero, this.inicio, this.final, this.precio).subscribe((back: any) => {
      if (back.status) {
        this.backOrder = back.respuesta;
        this.sindato = false;
      } else {
        this.sindato = true;
      }
    });
  }

  irA(producto: any) {
    this.route.navigate(['/verBack', {id: producto.articuloid, cantidad: producto.back}]);
    // this.route.navigate(['/ver/', producto.articuloid]);
  }

}
