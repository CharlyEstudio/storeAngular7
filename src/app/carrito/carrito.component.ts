import { Component, OnInit, ɵConsole } from '@angular/core';

import { Subscription, Observable, Subscriber } from 'rxjs';
import { Router } from '@angular/router';

// Modelos
import { Producto } from '../modelos/productos.model';
import { XmlString } from 'src/app/modelos/xml.model';
import { Usuario } from '../modelos/usuarios.model';

// Link
import { PATH_LINK } from '../config/config';

// Servicios
import { ProductosService, ShoppingService, UsuarioServicesService, DatosService } from '../servicios/servicios.index';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styles: []
})
export class CarritoComponent implements OnInit {

  cliente: Usuario;

  carrito: any[] = [];
  cantidad = 1;
  precioFinal = 0;
  items = 0;
  subtotal = 0;
  impuesto = 0;
  total = 0;

  vigente: boolean = false;

  // Observar para el carrito
  car: Subscription;
  intervalo: any;

  constructor(
    private router: Router,
    private _usuarioService: UsuarioServicesService,
    private _productosServices: ProductosService,
    private _shoppingCar: ShoppingService,
    private _datosService: DatosService
  ) {
    const carro = JSON.parse(localStorage.getItem('carrito'));

    if (carro.length > 0) {
      this.items = carro.length;
      for (let i = 0; i < carro.length; i++) {
        if (carro[i].iva > 0) {
          this.subtotal += carro[i].precioFinal / (1 + carro[i].iva);
        } else {
          this.subtotal += carro[i].precioFinal;
        }

        this.total += carro[i].precioFinal;
        this.carrito.push(carro[i]);
      }

      this.impuesto = this.total - this.subtotal;
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

  cambiarCantidad(producto: any, valor: any) {
    this.subtotal = 0;
    this.impuesto = 0;
    this.total = 0;
    const cantidadAnt = producto.cantidad;
    const division = Number(valor) % producto.lote;

    if (division === 0) {
      producto.precioFinal = (producto.precioneto * Number(valor));
      producto.cantidad = Number(valor);
      producto.precioTot = (producto.precioneto * Number(valor));
      for (let i = 0; i < this.carrito.length; i++) {
        this.subtotal += (this.carrito[i].precioFinal / (1 + this.carrito[i].iva));
        this.total += this.carrito[i].precioTot;

        if (this.carrito[i].iva > 0) {
          this.impuesto += this.carrito[i].precioTot - (this.carrito[i].precioFinal / (1 + this.carrito[i].iva));
        }
      }

      localStorage.removeItem('carrito');
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
    } else {
      const elem = <HTMLInputElement>(document.getElementById('input' + producto.codigo));
      elem.value = cantidadAnt;
      for (let i = 0; i < this.carrito.length; i++) {
        this.subtotal += (this.carrito[i].precioFinal / (1 + this.carrito[i].iva));
        this.total += this.carrito[i].precioTot;

        if (this.carrito[i].iva > 0) {
          this.impuesto += this.carrito[i].precioTot - (this.carrito[i].precioFinal / (1 + this.carrito[i].iva));
        }
      }

      localStorage.removeItem('carrito');
      localStorage.setItem('carrito', JSON.stringify(this.carrito));
      swal('Cantidad Incorrecta', 'Solo se pueden ingresar cantidades multiplos de: ' + producto.lote, 'error');
    }
  }

  ngOnInit() {
    if (this._usuarioService.usuario !== null) {
      this.cliente = this._usuarioService.usuario;
      if (localStorage.getItem('vigente') === 'true') {
        this.vigente = true;
      } else {
        this.vigente = false;
      }
    } else {
      this.vigente = false;
      console.log('Aquí va el código si es cliente público.');
    }
  }

  enviarPedido(pedido: any) {
    let xml;

    xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
          '<cfdi:Comprobante Version="3.3" Serie="W">' +
            '<cfdi:Receptor Rfc="' + this.cliente.rfc + '" CliNumero="' + this.cliente.numero + '" />' +
            '<cfdi:Conceptos>';

    for (let i = 0; i < pedido.length; i++) {
      xml += '<cfdi:Concepto NoIdentificacion="' + pedido[i].articuloid + '" cantidad="' + pedido[i].cantidad + '"/>';
    }

    xml +=  '</cfdi:Conceptos>' +
          '</cfdi:Comprobante>';

    swal({
      title: 'Su pedido será procesado, ¿Seguro que desea enviar su pedido?',
      icon: 'warning',
      buttons: {
        cancel: true,
        confirm: true
      }
    })
    .then(( status ) => {
      if (!status) { return null; }

      const enviarXml: XmlString = {
        texto: xml
      };

      this._shoppingCar.enviarPedido(enviarXml).subscribe((info: any) => {
        this.carrito = [];
        localStorage.removeItem('carrito');
        this._shoppingCar.clearCarrito();
        this.router.navigate(['/inicio']);
      });
    });
  }

}
