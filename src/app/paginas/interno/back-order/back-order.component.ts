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
        for (let i = 0; i < back.respuesta.length; i++) {
          this._productoService.obtenerImagenes(back.respuesta[i].CODIGO).subscribe((imagen: any) => {
            let photo;

            if (imagen.status) {
              photo = imagen.respuesta[0].imagen;
            } else {
              photo = 'product.png';
            }

            let datos;
            const bo = (back.respuesta[i].SOLICITADO - back.respuesta[i].ENTREGADO);

            datos = {
              articuloid: back.respuesta[i].ARTICULOID,
              clave: back.respuesta[i].CLAVE,
              codigo: back.respuesta[i].CODIGO,
              existencia: back.respuesta[i].EXISTENCIA,
              importe: back.respuesta[i].IMPORTE,
              nombre: back.respuesta[i].NOMBRE,
              precio: back.respuesta[i].PRECIO,
              solicitado: back.respuesta[i].SOLICITADO,
              entregado: back.respuesta[i].ENTREGADO,
              descuento: back.respuesta[i].DESCUENTO,
              back: bo,
              img: PATH_LINK + '/assets/img_products/' + photo
            };

            this.backOrder.push(datos);
            this.backOrder.sort((a, b) => {
              if (a.back < b.back) {
                return 1;
              }

              if (a.back > b.back) {
                return -1;
              }

              return 0;
            });
          });
        }
      }
    });
  }

  irA(producto: any) {
    this.route.navigate(['/verBack', {id: producto.articuloid, cantidad: producto.back}]);
    // this.route.navigate(['/ver/', producto.articuloid]);
  }

}
