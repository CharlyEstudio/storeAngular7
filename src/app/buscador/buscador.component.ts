import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

// Modelos
import { Producto } from '../modelos/productos.model';

// Config
import { PATH_LINK } from '../config/config';

// Servicios
import { ProductosService, UsuarioServicesService } from 'src/app/servicios/servicios.index';

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
    private _usuarioService: UsuarioServicesService
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
    this._productosService.buscarProductos(buscar, this.precio).subscribe((encontrado: any) => {
      if (encontrado.status) {
        this.buscandoBol = false;
        this.errorBol = false;
        this.encontradoBol = true;
        for (let i = 0; i < encontrado.respuesta.length; i++) {
          this._productosService.obtenerImagenes(encontrado.respuesta[i].codigo).subscribe((imagenes: any) => {
            let image;

            if (imagenes.status) {
              image = imagenes.respuesta[0].imagen;
            } else {
              image = 'product.png';
            }

            this._productosService.obtenerMarca(encontrado.respuesta[i].articuloid).subscribe((marca: any) => {
              let datos: Producto;

              if (marca.status) {

                datos = {
                  articuloid: encontrado.respuesta[i].articuloid,
                  descripcion: encontrado.respuesta[i].descripcion,
                  clave: encontrado.respuesta[i].clave,
                  codigo: encontrado.respuesta[i].codigo,
                  marca: marca.respuesta[0].marca,
                  cantidad: 1,
                  precioneto: encontrado.respuesta[i].precioneto,
                  iva: encontrado.respuesta[i].iva,
                  precio: (encontrado.respuesta[i].precio - (encontrado.respuesta[i].precio * encontrado.respuesta[i].descuento)),
                  precioAumentado: encontrado.respuesta[i].precio * (1 + (encontrado.respuesta[i].descuento)),
                  img: PATH_LINK + '/assets/img_products/' + image,
                  descuento: encontrado.respuesta[i].descuento,
                  entregado: encontrado.respuesta[i].entregado,
                };

              } else {

                datos = {
                  articuloid: encontrado.respuesta[i].articuloid,
                  descripcion: encontrado.respuesta[i].descripcion,
                  clave: encontrado.respuesta[i].clave,
                  codigo: encontrado.respuesta[i].codigo,
                  marca: 'Sin Marca',
                  cantidad: 1,
                  precioneto: encontrado.respuesta[i].precioneto,
                  iva: encontrado.respuesta[i].iva,
                  precio: (encontrado.respuesta[i].precio - (encontrado.respuesta[i].precio * encontrado.respuesta[i].descuento)),
                  precioAumentado: encontrado.respuesta[i].precio * (1 + (encontrado.respuesta[i].descuento)),
                  img: PATH_LINK + '/assets/img_products/' + image,
                  descuento: encontrado.respuesta[i].descuento,
                  entregado: encontrado.respuesta[i].entregado,
                };

              }

              this.encontrado.push(datos);
              this.encontrado.sort((a, b) => {
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
