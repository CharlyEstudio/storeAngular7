import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

// Servicios
import { UsuarioServicesService, ProductosService, ShoppingService } from 'src/app/servicios/servicios.index';

// Modelos
import { Usuario } from 'src/app/modelos/usuarios.model';
import { XmlString } from 'src/app/modelos/xml.model';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styles: []
})
export class PedidoComponent implements OnInit {

  @ViewChild('input')  input: ElementRef;

  cliente: Usuario;

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
  vigente: boolean = false;

  constructor(
    private _usuarioService: UsuarioServicesService,
    private _productoService: ProductosService,
    private _shoppingCar: ShoppingService
  ) {
    this.precio = this._usuarioService.usuario.precio;
    this.cliente = this._usuarioService.usuario;
    if (localStorage.getItem('pedidoDist') !== null) {
      this.productos = JSON.parse(localStorage.getItem('pedidoDist'));
      this.subtotal = Number(localStorage.getItem('subtotalPed'));
      this.iva = Number(localStorage.getItem('ivaPed'));
      this.total = Number(localStorage.getItem('totalPed'));
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

  eliminarTodo() {
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
    this.productos = [];
    localStorage.removeItem('pedidoDist');
    localStorage.removeItem('subtotalPed');
    localStorage.removeItem('ivaPed');
    localStorage.removeItem('totalPed');
  }

  eliminarProd(index: any) {
    this.productos.splice(index, 1);
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;

    localStorage.removeItem('pedidoDist');
    localStorage.removeItem('subtotalPed');
    localStorage.removeItem('ivaPed');
    localStorage.removeItem('totalPed');

    for (let i = 0; i < this.productos.length; i++) {
      this.subtotal += this.productos[i].precioFinal;
      this.total += this.productos[i].precioTot;

      if (this.productos[i].producto.iva > 0) {
        this.iva += this.productos[i].precioTot - this.productos[i].precioFinal;
      }
    }

    localStorage.setItem('pedidoDist', JSON.stringify(this.productos));
    localStorage.setItem('subtotalPed', String(this.subtotal));
    localStorage.setItem('ivaPed', String(this.iva));
    localStorage.setItem('totalPed', String(this.total));
  }

  procesar() {
    let xml;

    xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
          '<cfdi:Comprobante Version="3.3" Serie="W">' +
            '<cfdi:Receptor Rfc="' + this.cliente.rfc + '" CliNumero="' + this.cliente.numero + '" />' +
            '<cfdi:Conceptos>';

    for (let i = 0; i < this.productos.length; i++) {
      xml += '<cfdi:Concepto NoIdentificacion="' + this.productos[i].producto.articuloid + '" cantidad="' + this.productos[i].cantidad + '"/>';
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
        this.eliminarTodo();
      });
    });
  }

}
