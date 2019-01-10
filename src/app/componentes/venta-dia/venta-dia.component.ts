import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Modelos
import { Producto } from '../../modelos/productos.model';

// Link
import { LINK } from 'src/app/config/config';

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
    this.router.navigate(['/ver/', producto.id]);
  }

  obtenerEstrellas() {
    this._productosServices.obtenerMejoresVentasDia().subscribe( (mejores: any) => {
      for (let i = 0; i < mejores.length; i++) {
        this._productosServices.obtenerImagenes(mejores[i].codigo).subscribe((imagenes: any) => {
          let image;

          if (imagenes.length > 0) {
            image = imagenes[0].imagen;
          } else {
            image = 'product.png';
          }

          const datos: Producto = {
            id: mejores[i].articuloid,
            descripcion: mejores[i].descripcion,
            clave: mejores[i].clave,
            codigo: mejores[i].codigo,
            precioneto: mejores[i].precioneto,
            iva: mejores[i].iva,
            precio: mejores[i].precio,
            precioAumentado: mejores[i].precio * (1 + (mejores[i].descuento)),
            img: LINK + '/assets/img_products/' + image,
            descuento: mejores[i].descuento,
            entregado: mejores[i].entregado,
          };

          this.mejores.push(datos);
        });
      }
    });
  }

}
