import { Component, OnInit } from '@angular/core';

import { Subscription, Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';

// Modelos
import { Producto } from '../modelos/productos.model';

// Link
import { PATH_LINK } from '../config/config';

// Servicios
import { ProductosService, ShoppingService } from '../servicios/servicios.index';

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
    private _shoppingCar: ShoppingService,
    private router: Router
  ) {
    const carro = JSON.parse(localStorage.getItem('carrito'));

    if (carro.length > 0) {
      this.items = carro.length;
      for (let i = 0; i < carro.length; i++) {
        this._productosServices.obtenerImagenes(carro[i].codigo).subscribe((imagenes: any) => {
          let image;

          if (imagenes.status) {
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
            precioAumentado: carro[i].precioneto,
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
        this._shoppingCar.deleteProducto(index);
        this.carrito.splice(index, 1);
        this.items = this.carrito.length;
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
        this._shoppingCar.clearCarrito();
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
