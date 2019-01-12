import { Component, OnInit } from '@angular/core';

import { Subscription, Observable, Subscriber } from 'rxjs';

// Modelos
import { Producto } from '../modelos/productos.model';
import { Router } from '@angular/router';

// Link
import { PATH_LINK } from '../config/config';

// Servicios
import { ProductosService } from '../servicios/servicios.index';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styles: []
})
export class CarritoComponent implements OnInit {

  carrito: any[] = [];
  cantidad = 1;
  precioFinal = 0;
  items = 0;

  // Observar para el carrito
  car: Subscription;
  intervalo: any;

  constructor(
    private _productosServices: ProductosService,
    private router: Router
  ) {
    const carro = JSON.parse(localStorage.getItem('carrito'));

    if (carro.length > 0) {
      this.items = carro.length;
      for (let i = 0; i < carro.length; i++) {
        this._productosServices.obtenerImagenes(carro[i].codigo).subscribe((imagenes: any) => {
          let image;

          if (imagenes.respuesta.length > 0) {
            image = imagenes.respuesta[0].imagen;
          } else {
            image = 'product.png';
          }

          const data: Producto = {
            articuloid: carro[i].articuloid,
            descripcion: carro[i].descripcion,
            clave: carro[i].clave,
            codigo: carro[i].codigo,
            marca: carro[i].marca,
            cantidad: carro[i].cantidad,
            precioneto: carro[i].precioneto,
            iva: carro[i].iva,
            precio: carro[i].precio,
            precioAumentado: carro[i].precio * (1 + (carro[i].descuento)),
            img: PATH_LINK + '/assets/img_products/' + image,
            descuento: carro[i].descuento,
            precioFinal: carro[i].precioFinal,
            entregado: carro[i].entregado,
            msg: carro[i].msg,
            pz: carro[i].pz,
            inner: carro[i].inner,
            ma: carro[i].ma
          };

          this.carrito.push(data);
        });
      }
    } else {
      this.router.navigate(['/inicio']);
    }

    // Subscripción
    this.car = this.regresa().subscribe(
      datos => {
        if (datos.length > 0) {
          // this.carrito = datos;
          for (let i = 0; i < datos.length; i++) {
            this._productosServices.obtenerImagenes(datos[i].codigo).subscribe((imagenes: any) => {
              let image;

              if (imagenes.respuesta.length > 0) {
                image = imagenes.respuesta[0].imagen;
              } else {
                image = 'product.png';
              }

              const data: Producto = {
                articuloid: datos[i].articuloid,
                descripcion: datos[i].descripcion,
                clave: datos[i].clave,
                codigo: datos[i].codigo,
                marca: datos[i].marca,
                cantidad: 1,
                precioneto: datos[i].precioneto,
                iva: datos[i].iva,
                precio: datos[i].precio,
                precioAumentado: datos[i].precio * (1 + (datos[i].descuento)),
                img: PATH_LINK + '/assets/img_products/' + image,
                descuento: datos[i].descuento,
                precioFinal: datos[i].precio,
                entregado: datos[i].entregado,
                msg: datos[i].msg,
                pz: datos[i].pz,
                inner: datos[i].inner,
                ma: datos[i].ma
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
        if (localStorage.getItem('carrito') !== null) {
          if (JSON.parse(localStorage.getItem('carrito')).length !== this.carrito.length) {
            observer.next(JSON.parse(localStorage.getItem('carrito')));
          }
        }
      }, 100);
    });
  }

  eliminarProducto(index: number) {
    swal({
      title: '¿Desea eliminar este producto?',
      text: 'Esta acción eliminará producto elegido de su carrito.',
      icon: 'error',
      buttons: {
        cancel: true,
        confirm: true
      }
    })
    .then(accion => {
      if (accion) {
        this.carrito.splice(index, 1);
        localStorage.removeItem('carrito');
        if (this.carrito.length > 0) {
          localStorage.setItem('carrito', JSON.stringify(this.carrito));
        } else {
          this.router.navigate(['/inicio']);
        }
      }
    });
  }

  eliminarTodo() {
    swal({
      title: '¿Desea eliminar todo los productos?',
      text: 'Esta acción eliminará todos los productos de su carrito.',
      icon: 'error',
      buttons: {
        cancel: true,
        confirm: true
      }
    })
    .then(accion => {
      if (accion) {
        this.carrito = [];
        localStorage.removeItem('carrito');
        this.router.navigate(['/inicio']);
      }
    });
  }

  cambiarCantidad(producto: Producto, valor: any) {
    producto.precioFinal = (producto.precio * valor);
    producto.cantidad = Number(valor);

    if (valor >= producto.pz && valor < producto.inner) {
      producto.tipoSurtido = 'PZ';
      producto.msg = 'Este producto será surtido como Pieza.';
    } else if (producto.inner !== 0 && valor >= producto.inner && valor < producto.ma) {
      producto.tipoSurtido = 'IN';
      producto.msg = 'Este producto será surtido como Inner.';
    } else if (valor >= producto.ma) {
      producto.tipoSurtido = 'MA';
      producto.msg = 'Este producto será surtido como Master.';
    }

    localStorage.removeItem('carrito');
    localStorage.setItem('carrito', JSON.stringify(this.carrito));
  }

  ngOnInit() {
  }

}
