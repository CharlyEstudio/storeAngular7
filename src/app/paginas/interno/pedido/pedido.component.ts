import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Servicios
import { UsuarioServicesService, ProductosService } from 'src/app/servicios/servicios.index';

// Modelos
import { Producto } from 'src/app/modelos/productos.model';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styles: []
})
export class PedidoComponent implements OnInit {

  @ViewChild('input')  input: ElementRef;

  precio: number = 3;
  productos: any[] = [];
  unidades: any[] = [];

  // Totales
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  // Booleanos
  encontrado: boolean = true;
  repetido: boolean = false;

  constructor(
    private _usuarioService: UsuarioServicesService,
    private _productoService: ProductosService
  ) {
    this.precio = this._usuarioService.usuario.precio;
    if (localStorage.getItem('pedidoDist') !== null) {
      this.productos = JSON.parse(localStorage.getItem('pedidoDist'));
      this.subtotal = Number(localStorage.getItem('subtotalPed'));
      this.iva = Number(localStorage.getItem('ivaPed'));
      this.total = Number(localStorage.getItem('totalPed'));
    }
  }

  ngOnInit() {
  }

  agregar(valor: any) {
    this.encontrado = true;
    this.repetido = false;
    const esProducto = (producto: any) => {
      return producto.producto.codigo === valor;
    };

    if (!this.productos.find(esProducto)) {

      this._productoService.buscarProductos(valor, this.precio).subscribe((producto: any) => {
        if (producto.status) {
          this.subtotal += producto.respuesta[0].precioneto;
          this.total += producto.respuesta[0].precio;
          if (producto.respuesta[0].iva > 0) {
            this.iva += producto.respuesta[0].precio - producto.respuesta[0].precioneto;
          }
          this._productoService.obtenerUnidades(producto.respuesta[0].articuloid).subscribe((unidades: any) => {
            const agregar = {
              producto: producto.respuesta[0],
              unidades: unidades.respuesta,
              precioFinal: (producto.respuesta[0].precioneto * producto.respuesta[0].lote),
              precioDesc: producto.respuesta[0].precioneto,
              precioTot: producto.respuesta[0].precio,
              cantidad: producto.respuesta[0].lote
            };
            this.productos.push(agregar);
            this.productos.reverse();
            if (localStorage.getItem('pedidoDist') !== null) {
              localStorage.removeItem('pedidoDist');
              localStorage.removeItem('subtotalPed');
              localStorage.removeItem('ivaPed');
              localStorage.removeItem('totalPed');
              localStorage.setItem('pedidoDist', JSON.stringify(this.productos));
              localStorage.setItem('subtotalPed', String(this.subtotal));
              localStorage.setItem('ivaPed', String(this.iva));
              localStorage.setItem('totalPed', String(this.total));
            } else {
              localStorage.setItem('pedidoDist', JSON.stringify(this.productos));
              localStorage.setItem('subtotalPed', String(this.subtotal));
              localStorage.setItem('ivaPed', String(this.iva));
              localStorage.setItem('totalPed', String(this.total));
            }
          });
          this.input.nativeElement.value = '';
          this.input.nativeElement.focus();
          this.encontrado = true;
        } else {
          this.encontrado = false;
        }
      });

    } else {
      this.repetido = true;
    }
  }

  cambiarCantidad(producto: any, valor: any) {
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
    producto.precioFinal = (producto.precioDesc * Number(valor));
    producto.precioTot = (producto.producto.precio * Number(valor));
    producto.cantidad = Number(valor);

    for (let i = 0; i < this.productos.length; i++) {
      this.subtotal += this.productos[i].precioFinal;
      this.total += this.productos[i].precioTot;

      if (this.productos[i].producto.iva > 0) {
        this.iva += this.productos[i].precioTot - this.productos[i].precioFinal;
      }
    }

    localStorage.removeItem('pedidoDist');
    localStorage.removeItem('subtotalPed');
    localStorage.removeItem('ivaPed');
    localStorage.removeItem('totalPed');
    localStorage.setItem('pedidoDist', JSON.stringify(this.productos));
    localStorage.setItem('subtotalPed', String(this.subtotal));
    localStorage.setItem('ivaPed', String(this.iva));
    localStorage.setItem('totalPed', String(this.total));
  }

}
