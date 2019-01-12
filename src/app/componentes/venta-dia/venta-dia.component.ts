import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Modelos
import { Producto } from '../../modelos/productos.model';

// Link
import { PATH_LINK } from '../../config/config';

// Servicios
import { ProductosService } from 'src/app/servicios/servicios.index';

@Component({
  selector: 'app-venta-dia',
  templateUrl: './venta-dia.component.html',
  styles: []
})
export class VentaDiaComponent implements OnInit {

  mejores: any[] = [];

  constructor(
    private _productosServices: ProductosService,
    private router: Router
  ) { }

  ngOnInit() {
    this.obtenerEstrellas();
  }

  irA(producto: Producto) {
    this.router.navigate(['/ver/', producto.articuloid]);
  }

  obtenerEstrellas() {
    this._productosServices.obtenerMejoresVentasDia().subscribe( (mejores: any) => {
      for (let i = 0; i < mejores.respuesta.length; i++) {
        this._productosServices.obtenerImagenes(mejores.respuesta[i].codigo).subscribe((imagenes: any) => {
          let image;

          if (imagenes.length > 0) {
            image = imagenes[0].imagen;
          } else {
            image = 'product.png';
          }

          this._productosServices.obtenerMarca(mejores.respuesta[i].articuloid).subscribe((marca: any) => {

            let datos: Producto;

            if (marca.respuesta.length > 0) {

              datos = {
                articuloid: mejores.respuesta[i].articuloid,
                descripcion: mejores.respuesta[i].descripcion,
                clave: mejores.respuesta[i].clave,
                codigo: mejores.respuesta[i].codigo,
                marca: marca.respuesta[0].marca,
                cantidad: 1,
                precioneto: mejores.respuesta[i].precioneto,
                iva: mejores.respuesta[i].iva,
                precio: mejores.respuesta[i].precio,
                precioAumentado: mejores.respuesta[i].precio * (1 + (mejores.respuesta[i].descuento)),
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
                precio: mejores.respuesta[i].precio,
                precioAumentado: mejores.respuesta[i].precio * (1 + (mejores.respuesta[i].descuento)),
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
    });
  }

}
