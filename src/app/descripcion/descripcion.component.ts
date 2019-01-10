import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

// Alertas
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Modelos
import { Producto } from '../modelos/productos.model';

// LINK
import { LINK } from '../config/config';

// Servicios
import { ProductosService, ShoppingService } from '../servicios/servicios.index';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styles: []
})
export class DescripcionComponent implements OnInit {

  id: any;

  // Producto
  producto: Producto;
  descripcion: any;
  clave: any;
  codigo: any;
  imagen: any;
  precio: number;
  desc: number;
  unidades: any[] = [];

  // Form
  unidad = 0;
  cantidad: number;

  // Para subir el precio si trae descuento
  precioAumentado: number;

  // Booleanos
  descuentoBol = false;

  constructor(
    private route: ActivatedRoute,
    private _productoServices: ProductosService,
    private _shoppingService: ShoppingService
  ) {
    this.id = Number(this.route.snapshot.paramMap.get('producto'));
    this.obtenerProducto(this.id);
  }

  ngOnInit() {
  }

  obtenerProducto(id: any) {
    this._productoServices.obtenerDescripcion(id).subscribe((producto: any) => {
      this.producto = producto[0];
      this.descripcion = producto[0].descripcion;
      this.clave = producto[0].clave;
      this.codigo = producto[0].codigo;
      this.precio = producto[0].precio;
      this.desc = producto[0].descuento;

      this.precioAumentado = this.precio * (1 + (producto[0].descuento / 100));

      if (producto[0].descuento > 0) {
        this.descuentoBol = true;
      }

      this._productoServices.obtenerImagenes(this.codigo).subscribe((imagen: any) => {
        let image;

        if (imagen.length > 0) {
          image = imagen[0].imagen;
        } else {
          image = 'product.png';
        }

        this.imagen = LINK + '/assets/img_products/' + image;
      });

      this._productoServices.obtenerUnidades(id).subscribe((unidades: any) => {
        this.unidades = unidades;
        this.cantidad = unidades[0].entero;
      });
    });
  }

  agregarCarrito(producto: Producto, forma: NgForm) {

    if (forma.value.unidad === 0) {
      swal('Debe ingresar la unidad', 'No ha selecionado un un tipo de unidad.', 'error');
      return;
    }

    this._shoppingService.guardarCarrito(producto, forma.value);
  }

  agregarFavoritos(producto: Producto, forma: NgForm) {
    console.log('Agregando Producto a Favoritos:', producto);
  }

  comeBack() {
    window.history.back();
  }

}
