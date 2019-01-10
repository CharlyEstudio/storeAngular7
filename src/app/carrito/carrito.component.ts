import { Component, OnInit } from '@angular/core';

import { Subscription, Observable, Subscriber } from 'rxjs';

// Modelos
import { Producto } from '../modelos/productos.model';
import { Router } from '@angular/router';

// Link
import { LINK } from '../config/config';

// Servicios
import { ProductosService } from '../servicios/servicios.index';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styles: []
})
export class CarritoComponent implements OnInit {

  carrito: any[] = [];

  // Observar para el carrito
  car: Subscription;
  intervalo: any;

  constructor(
    private _productosServices: ProductosService,
    private router: Router
  ) {
    const carro = JSON.parse(localStorage.getItem('carrito'));
    for (let i = 0; i < carro.length; i++) {
      this._productosServices.obtenerImagenes(carro[i].codigo).subscribe((imagenes: any) => {
        let image;

        if (imagenes.length > 0) {
          image = imagenes[0].imagen;
        } else {
          image = 'product.png';
        }

        const data: Producto = {
          id: carro[i].articuloid,
          descripcion: carro[i].descripcion,
          clave: carro[i].clave,
          codigo: carro[i].codigo,
          precioneto: carro[i].precioneto,
          iva: carro[i].iva,
          precio: carro[i].precio,
          precioAumentado: carro[i].precio * (1 + (carro[i].descuento)),
          img: LINK + '/assets/img_products/' + image,
          descuento: carro[i].descuento,
          entregado: carro[i].entregado,
        };

        this.carrito.push(data);
      });
    }

    // Subscripción
    this.car = this.regresa().subscribe(
      datos => {
        if (datos.length > 0) {
          // this.carrito = datos;
          for (let i = 0; i < datos.length; i++) {
            this._productosServices.obtenerImagenes(datos[i].codigo).subscribe((imagenes: any) => {
              let image;

              if (imagenes.length > 0) {
                image = imagenes[0].imagen;
              } else {
                image = 'product.png';
              }

              const data: Producto = {
                id: datos[i].articuloid,
                descripcion: datos[i].descripcion,
                clave: datos[i].clave,
                codigo: datos[i].codigo,
                precioneto: datos[i].precioneto,
                iva: datos[i].iva,
                precio: datos[i].precio,
                precioAumentado: datos[i].precio * (1 + (datos[i].descuento)),
                img: LINK + '/assets/img_products/' + image,
                descuento: datos[i].descuento,
                entregado: datos[i].entregado,
              };

              this.carrito.push(data);
            });
          }
        }
      },
      err => console.error(err),
      () => console.log('Termina')
    );
  }

  regresa(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intervalo = setInterval(() => {
        if (JSON.parse(localStorage.getItem('carrito')).length !== this.carrito.length) {
          observer.next(JSON.parse(localStorage.getItem('carrito')));
        }
      }, 100);
    });
  }

  irA(producto: Producto) {
    this.router.navigate(['/ver/', producto.id]);
  }

  ngOnInit() {
  }

}
