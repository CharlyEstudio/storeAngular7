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
        for (let i = 0; i < mejores.respuesta.length; i++) {
          this._productosServices.obtenerImagenes(mejores.respuesta[i].codigo).subscribe((imagenes: any) => {
            let image;

            if (imagenes.status) {
              image = imagenes.respuesta[0].imagen;
            } else {
              image = 'product.png';
            }

            this._productosServices.obtenerMarca(mejores.respuesta[i].articuloid).subscribe((marca: any) => {
              let datos: Producto;

              if (marca.status) {

                datos = {
                  articuloid: mejores.respuesta[i].articuloid,
                  descripcion: mejores.respuesta[i].descripcion,
                  clave: mejores.respuesta[i].clave,
                  codigo: mejores.respuesta[i].codigo,
                  marca: marca.respuesta[0].marca,
                  cantidad: 1,
                  precioneto: mejores.respuesta[i].precioneto,
                  iva: mejores.respuesta[i].iva,
                  precio: (mejores.respuesta[i].precio - (mejores.respuesta[i].precio * mejores.respuesta[i].descuento)),
                  precioAumentado: mejores.respuesta[i].precio,
                  img: PATH_LINK + '/assets/img_products/' + image,
                  descuento: mejores.respuesta[i].descuento,
                  entregado: mejores.respuesta[i].entregado,
                };
              } else {
                datos = {
                  articuloid: mejores.respuesta[i].articuloid,
                  descripcion: mejores.respuesta[i].descripcion,
                  clave: mejores.respuesta[i].clave,
                  codigo: mejores.respuesta[i].codigo,
                  marca: 'Sin Marca',
                  cantidad: 1,
                  precioneto: mejores.respuesta[i].precioneto,
                  iva: mejores.respuesta[i].iva,
                  precio: (mejores.respuesta[i].precio - (mejores.respuesta[i].precio * mejores.respuesta[i].descuento)),
                  precioAumentado: mejores.respuesta[i].precio,
                  img: PATH_LINK + '/assets/img_products/' + image,
                  descuento: mejores.respuesta[i].descuento,
                  entregado: mejores.respuesta[i].entregado,
                };
              }

              this.mejores.push(datos);

                this.mejores.sort((a, b) => {
                  if (a.precio < b.precio) {
                    return 1;
                  }

                  if (a.precio > b.precio) {
                    return -1;
                  }

                  return 0;
                });
            });
          });
        }
      }
    });
  }

}
