import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import { BehaviorSubject } from 'rxjs';

// Alertas
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Modelos
import { Producto } from 'src/app/modelos/productos.model';
import { XmlString } from 'src/app/modelos/xml.model';

// URL PRINCIPAL
import { LINK, PATH_LINK } from 'src/app/config/config';

// Servicios
import { UsuarioServicesService } from '../usuario-servicios/usuario-services.service';

@Injectable()
export class ShoppingService {

  private subject: BehaviorSubject<Producto[]> = new BehaviorSubject([]);
  private itemsCarrito: Producto[] = [];

  dato: any[] = [];
  token: string = this._usuarioService.token;

  constructor(
    private router: Router,
    private http: HttpClient,
    private _usuarioService: UsuarioServicesService
  ) {
    // this.token = this._usuarioService.token;
    // this.token = localStorage.getItem('token');
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
    const url = `${LINK}/ferrum/subir/pedido/7854956231457643`;

    return this.http.post(url, xml);
  }

  descPromotruper() {
    const url = `${LINK}/cobertura/promotruper/desc`;

    return this.http.get(url);
  }

  productosDesc(desc: any, precio: any) {
    const url = `${LINK}/cobertura/promotruper/desc/num/${desc}/${precio}`;

    return this.http.get(url);
  }

  porBajar(usuario: any, fecha: any) {
    let url = `${LINK}/bigdata/obtener/porbajar/${usuario.idFerrum}/${fecha}`;

    url += '?token=' + this.token;

    return this.http.get(url);
  }

  porSurtir(usuario: any, fecha: any) {
    let url = `${LINK}/bigdata/obtener/porsurtir/${usuario.idFerrum}/${fecha}`;

    url += '?token=' + this.token;

    return this.http.get(url);
  }

  facturado(usuario: any, fecha: any) {
    let url = `${LINK}/bigdata/obtener/facturados/${usuario.idFerrum}/${fecha}`;

    url += '?token=' + this.token;

    return this.http.get(url);
  }

  partidas(docid: any) {
    const url = `${LINK}/bigdata/obtener/partidas/${docid}` ;

    return this.http.get(url);
  }

  allPedidos(usuario: any, fecha: any) {
    const url = `${LINK}/bigdata/obtener/allpedido/${usuario.idFerrum}/${fecha}`;

    return this.http.get(url);
  }
}
