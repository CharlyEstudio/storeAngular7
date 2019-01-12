import { Component, OnInit, ɵConsole } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

// Alertas
import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Modelos
import { Producto } from '../modelos/productos.model';

// LINK
import { PATH_LINK } from '../config/config';

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
  marca: any;
  articuloid: any;
  imagen = PATH_LINK + '/assets/img_products/product.png';
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
      this.producto = producto.respuesta[0];
      this.descripcion = producto.respuesta[0].descripcion;
      this.clave = producto.respuesta[0].clave;
      this.codigo = producto.respuesta[0].codigo;
      this.articuloid = producto.respuesta[0].articuloid;
      this.precio = producto.respuesta[0].precio;
      this.desc = producto.respuesta[0].descuento;

      this._productoServices.obtenerMarca(producto.respuesta[0].articuloid).subscribe((marca: any) => {
        if (marca.respuesta.length > 0) {
          this.marca = marca.respuesta[0].marca;
        } else {
          this.marca = 'Sin Marca';
        }
      });

      this.precioAumentado = this.precio * (1 + (producto.respuesta[0].descuento));

      if (producto.respuesta[0].descuento > 0) {
        this.descuentoBol = true;
      }

      this._productoServices.obtenerImagenes(this.codigo).subscribe((imagen: any) => {
        let image;

        if (imagen.respuesta.length > 0) {
          image = imagen.respuesta[0].imagen;
        } else {
          image = 'product.png';
        }

        this.imagen = PATH_LINK + '/assets/img_products/' + image;
      });

      this._productoServices.obtenerUnidades(id).subscribe((unidades: any) => {
        this.unidades = unidades.respuesta;
        this.cantidad = unidades.respuesta[0].entero;
      });
    });
  }

  agregarCarrito(producto: Producto, unidades: any, forma: NgForm, marca: any) {
    const cantidad =  Number(forma.value.cantidad);
    let pzs;
    let inner;
    let ma;
    let transMaster;

    if (unidades.length > 2) {
      pzs = unidades[0].entero;
      inner = unidades[1].entero;
      ma = unidades[2].entero;
      transMaster = ma * inner;

      if (cantidad >= pzs && cantidad < inner) {
        producto.divide = 1;
        producto.tipoSurtido = 'PZ';
        producto.msg = 'Este producto será surtido como Pieza.';
      } else if (cantidad >= inner && cantidad < transMaster) {
        producto.divide = inner;
        producto.tipoSurtido = 'IN';
        producto.msg = 'Este producto será surtido como Inner.';
      } else {
        producto.divide = transMaster;
        producto.tipoSurtido = 'MA';
        producto.msg = 'Este producto será surtido como Master.';
      }

      producto.inner = inner;
    } else if (unidades.length > 1) {
      pzs = unidades[0].entero;

      if (unidades[0].unidad === 'IN') {
        inner = unidades[0].entero;
        producto.inner = inner;
      } else if (unidades[0].unidad === 'MA') {
        inner = unidades[0].entero;
        producto.inner = inner;
      } else {
        inner = unidades[1].entero - 1;
        // Esto lo coloqué aqrí por que hay productos que no tiene inner y lo mando con 0
        producto.inner = 0;
      }

      if (unidades[1].unidad === 'IN') {
        ma = unidades[1].entero;
      } else if (unidades[1].unidad === 'MA') {
        ma = unidades[1].entero;
      }

      transMaster = ma * inner;

      if (cantidad >= pzs && cantidad < inner) {
        producto.divide = 1;
        producto.tipoSurtido = 'PZ';
        producto.msg = 'Este producto será surtido como Pieza.';
      } else if (cantidad >= inner && cantidad < transMaster) {
        producto.divide = inner;
        producto.tipoSurtido = 'IN';
        producto.msg = 'Este producto será surtido como Inner.';
      } else {
        producto.divide = transMaster;
        producto.tipoSurtido = 'MA';
        producto.msg = 'Este producto será surtido como Master.';
      }
    }

    producto.pz = pzs;
    producto.ma = ma;

    // Agrego la marca
    producto.marca = marca;

    producto.cantidad = cantidad;
    producto.precioFinal = producto.precio * cantidad;

    this._shoppingService.guardarCarrito(producto);
  }

  agregarFavoritos(producto: Producto, forma: NgForm) {
    console.log('Agregando Producto a Favoritos:', producto);
  }

  comeBack() {
    window.history.back();
  }

}
