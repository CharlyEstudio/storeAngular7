import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

// Modelos
import { Producto } from 'src/app/modelos/productos.model';
import { XmlString } from 'src/app/modelos/xml.model';

@Injectable()
export class ShoppingService {

  private subject: BehaviorSubject<Producto[]> = new BehaviorSubject([]);
  private itemsCarrito: Producto[] = [];

  dato: any[] = [];

  constructor(
    private router: Router,
    private http: HttpClient
  ) {
    this.subject.subscribe((data) => {
      let num;
      if (data) {
        num = data;
      } else {
        num = [];
      }
      return this.itemsCarrito = num;
    });
  }

  /**
   * addCarrito
   * @param producto
   */
  addCarrito(producto: Producto) {
    this.subject.next([...this.itemsCarrito, producto]);
  }

  getCarrito() {
    return this.subject;
  }

  getTotal() {
    return this.itemsCarrito.reduce((total, producto: Producto) => {
      return total + producto.precio;
    }, 0);
  }

  clearCarrito() {
    this.itemsCarrito = [];
    this.dato = [];
    this.subject.next(null);
    this.subject.next(this.dato);
  }

  deleteProducto(index: number) {
    this.dato = JSON.parse(localStorage.getItem('carrito'));
    this.dato.splice(index, 1);
    localStorage.removeItem('carrito');
    if (this.dato.length > 0) {
      localStorage.setItem('carrito', JSON.stringify(this.dato));
    } else {
      this.router.navigate(['/inicio']);
    }
    this.subject.next(null);
    this.subject.next(this.dato);
  }

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

  enviarPedido(xml: XmlString) {
    const url = 'http://177.244.55.122:3001/ferrum/subir/pedido';

    return this.http.post(url, xml);
  }

  descPromotruper() {
    const url = 'http://177.244.55.122:3001/cobertura/promotruper/desc';

    return this.http.get(url);
  }
}
