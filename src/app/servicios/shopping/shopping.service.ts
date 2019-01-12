import { Injectable, ɵConsole } from '@angular/core';

// Modelos
import { Producto } from 'src/app/modelos/productos.model';

@Injectable()
export class ShoppingService {

  dato: any[] = [];

  constructor() { }

  guardarCarrito(producto: Producto) {
    if (localStorage.getItem('carrito') === null) {
      this.dato.push(producto);
      localStorage.setItem('carrito', JSON.stringify(this.dato));
      swal('Agregado al Carrito', 'Este artículo se ha agregado a su carrito.', 'success');
    } else {
      this.dato = JSON.parse(localStorage.getItem('carrito'));

      const esIgual = (articulo: any) => {
        return articulo.articuloid === producto.articuloid;
      };

      if (this.dato.find(esIgual)) {
        swal('Artículo en Carrito', 'Este artículo ya esta en su carrito.', 'warning');
      } else {
        swal('Agregado al Carrito', 'Este artículo se ha agregado a su carrito.', 'success');
        localStorage.removeItem('carrito');
        this.dato.push(producto);
        localStorage.setItem('carrito', JSON.stringify(this.dato));

      }

    }
  }
}
