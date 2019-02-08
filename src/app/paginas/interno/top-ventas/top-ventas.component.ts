import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Modelos
import { Producto } from 'src/app/modelos/productos.model';

// Links
import { PATH_LINK } from 'src/app/config/config';

// Servicios
import { UsuarioServicesService, DatosService, ShoppingService, ProductosService } from 'src/app/servicios/servicios.index';

@Component({
  selector: 'app-top-ventas',
  templateUrl: './top-ventas.component.html',
  styles: []
})
export class TopVentasComponent implements OnInit {

  precio: number = 0;
  numero: string;
  inicio: string;
  final: string;
  sindato: boolean = false;

  topTen: any[] = [];

  constructor(
    private route: Router,
    private _usuarioService: UsuarioServicesService,
    private _productoService: ProductosService
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
    this.obtenerTopTen();
  }

  obtenerTopTen() {
    this._productoService.obtenerTopTen(this.numero, this.inicio, this.final, this.precio).subscribe((top: any) => {
      if (top.status) {
        for (let i = 0; i < top.respuesta.length; i++) {
          this._productoService.obtenerImagenes(top.respuesta[i].CODIGO).subscribe((imagen: any) => {
            if (imagen.status) {
              let photo;

              if (imagen.status) {
                photo = imagen.respuesta[0].imagen;
              } else {
                photo = 'product.png';
              }

              let datos;

              datos = {
                articuloid: top.respuesta[i].DESARTID,
                codigo: top.respuesta[i].CODIGO,
                clave: top.respuesta[i].CLAVE,
                nombre: top.respuesta[i].DESCRIPCIO,
                entregado: top.respuesta[i].ENTREGADO,
                precio: top.respuesta[i].PRECIO,
                img: PATH_LINK + '/assets/img_products/' + photo
              };

              this.topTen.push(datos);
            }
          });
        }
        this.topTen.sort((a, b) => {
          if (a.entregado < b.entregado) {
            return 1;
          }

          if (a.entregado > b.entregado) {
            return -1;
          }

          return 0;
        });
        this.sindato = false;
      } else {
        this.sindato = true;
      }
    });
  }

  irA(producto: Producto) {
    this.route.navigate(['/ver/', producto.articuloid]);
  }

}
