import { Injectable } from '@angular/core';

// Modelos
import { Producto } from 'src/app/modelos/productos.model';

@Injectable()
export class ShoppingService {

  dato: any[] = [];

  constructor() { }

  guardarCarrito(producto: Producto, valores: any) {
    if (localStorage.getItem('carrito') === null) {
      this.dato.push(producto);
      localStorage.setItem('carrito', JSON.stringify(this.dato));
    } else {
      this.dato = JSON.parse(localStorage.getItem('carrito'));

      const esEspecial = (articulo: any) => {
        return articulo.articuloid === producto.id;
      };

      if (this.dato.find(esEspecial)) {
        swal('Artículo en Carrito', 'Este artículo ya esta en su carrito.', 'warning');
      } else {

        localStorage.removeItem('carrito');
        this.dato.push(producto);
        localStorage.setItem('carrito', JSON.stringify(this.dato));

      }

    }
  }
}
