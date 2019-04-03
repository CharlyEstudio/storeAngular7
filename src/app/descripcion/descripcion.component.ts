import { Component, OnInit, ɵConsole, ViewChild, ElementRef } from '@angular/core';
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
import { ProductosService, ShoppingService, UsuarioServicesService } from '../servicios/servicios.index';

@Component({
  selector: 'app-descripcion',
  templateUrl: './descripcion.component.html',
  styles: []
})
export class DescripcionComponent implements OnInit {

  @ViewChild('input') input: ElementRef;

  id: any;
  precioUser: number = 3;

  // Producto
  dato: any[] = [];
  producto: Producto[] = [];
  descripcion: any;
  clave: any;
  codigo: any;
  marca: any;
  articuloid: any;
  imagen = 'assets/images/precarga/product_loader.gif';
  precio: number = 0;
  precioNeto: number = 0;
  desc: number = 0;
  lote: number = 0;
  cantidadBack: number = 0;
  cant_pz: number = 0;
  cant_in: number = 0;
  cant_ma: number = 0;
  unidad: any;

  // Para subir el precio si trae descuento
  precioAumentado: number;

  // Booleanos
  descuentoBol: boolean = false;
  backO: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private _usuarioService: UsuarioServicesService,
    private _productoServices: ProductosService,
    private _shoppingService: ShoppingService
  ) {
    if (this.route.snapshot.params['id']) {
      this.id = Number(this.route.snapshot.params['id']);
      this.cantidadBack = Number(this.route.snapshot.params['cantidad']);
      this.backO = true;
    } else {
      this.id = Number(this.route.snapshot.paramMap.get('producto'));
      this.backO = false;
    }

    if (this._usuarioService.usuario !== null) {
      this.precioUser = this._usuarioService.usuario.precio;
    }

    this.obtenerProducto(this.id, this.precioUser);
  }

  ngOnInit() {
  }

  obtenerProducto(id: any, precio: number) {
    this._productoServices.obtenerDescripcion(id, precio).subscribe((producto: any) => {
      if (producto.status) {
        this.dato = producto.respuesta;
        this.producto = producto.respuesta[0];
        this.descripcion = producto.respuesta[0].descripcion;
        this.clave = producto.respuesta[0].clave;
        this.codigo = producto.respuesta[0].codigo;
        this.articuloid = producto.respuesta[0].articuloid;
        this.precio = producto.respuesta[0].precio;
        this.precioNeto = producto.respuesta[0].precioneto;
        this.desc = producto.respuesta[0].descuento;
        this.marca = producto.respuesta[0].marca;
        this.imagen = producto.respuesta[0].imagen;
        this.precioAumentado = this.precioNeto;
        this.lote = producto.respuesta[0].lote;
        this.cant_pz = producto.respuesta[0].cant_pz;
        this.cant_in = producto.respuesta[0].cant_in;
        this.cant_ma = producto.respuesta[0].cant_ma;
        this.unidad = producto.respuesta[0].unidad;

        if (producto.respuesta[0].descuento > 0) {
          this.descuentoBol = true;
        }
      }
    });
  }

  cambiarCantidad(forma: NgForm) {
    const division = forma.value.cantidad % this.lote;
    if (division !== 0 && forma.value.cantidad !== '0') {
      this.input.nativeElement.value = this.lote;
      swal('Cantidad Incorrecta', 'Solo se puede colocar cantidades en multiplos de ' + this.lote, 'error');
    }
  }

  agregarCarrito(producto: any, forma: NgForm) {
    const cantidad =  Number(forma.value.cantidad);

    producto.cantidad = cantidad;
    producto.precioFinal = producto.precioneto * cantidad;

    this._shoppingService.guardarCarrito(producto);
    this._shoppingService.addCarrito(producto);
  }

  agregarFavoritos(producto: any, forma: NgForm) {
    console.log('Agregando Producto a Favoritos:', producto);
  }

  comeBack() {
    window.history.back();
  }

}
