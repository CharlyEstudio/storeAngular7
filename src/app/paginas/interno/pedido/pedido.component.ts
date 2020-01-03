import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

// Servicios
import { UsuarioServicesService, ProductosService, ShoppingService, WebsocketService, UtilsService } from 'src/app/servicios/servicios.index';

// Modelos
import { Usuario } from 'src/app/modelos/usuarios.model';
import { XmlString } from 'src/app/modelos/xml.model';
import swal from 'sweetalert';

@Component({
  selector: 'app-pedido',
  templateUrl: './pedido.component.html',
  styles: []
})
export class PedidoComponent implements OnInit {

  @ViewChild('input')  input: ElementRef;

  cliente: Usuario;
  activo: boolean = false;
  rol: any;
  fecha: number = Date.now();

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
    public router: ActivatedRoute,
    private _usuarioService: UsuarioServicesService,
    private _productoService: ProductosService,
    private _shoppingCar: ShoppingService,
    private _webSocket: WebsocketService,
    private _utilsService: UtilsService
  ) {
    this.precio = this._usuarioService.usuario.precio;
    this.cliente = this._usuarioService.usuario;
    this.activo = this._usuarioService.activo;
    this.rol = this.cliente.rol;
    if (localStorage.getItem('pedidoDist') !== null) {
      this.productos = JSON.parse(localStorage.getItem('pedidoDist'));
      this.subtotal = Number(localStorage.getItem('subtotalPed'));
      this.iva = Number(localStorage.getItem('ivaPed'));
      this.total = Number(localStorage.getItem('totalPed'));
      // console.log(this.productos);
    }

    this.activo = localStorage.getItem('vigente') === 'true' ? true : false;

    this.router.queryParams.subscribe((params: any) => {
      if (params.dato) {
        this.eliminarTodo();
        const data = JSON.parse(params.dato);
        if (data.length > 0) {
          for (let i = 0; i < data.length; i++) {
            this.producto(data[i].CODIGO, this.precio);
          }
        }
      }
    });
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

    // console.log(this.productos.find(esProducto));

    if (!this.productos.find(esProducto)) {

      this.producto(valor, this.precio);

    } else {
      this.repetido = true;
    }
  }

  producto(valor: any, precio: any) {
    this.productos.reverse();
    this._productoService.buscarProductoCodigo(valor, precio).subscribe((producto: any) => {
      console.log(producto.respuesta);
      if (producto.status) {
        this.subtotal += (producto.respuesta[0].precioneto * producto.respuesta[0].lote);
        this.total += (producto.respuesta[0].precio * producto.respuesta[0].lote);
        if (producto.respuesta[0].iva > 0) {
          this.iva += (producto.respuesta[0].precio - producto.respuesta[0].precioneto) * producto.respuesta[0].lote;
        }
        const agregar = {
          producto: producto.respuesta[0],
          precioFinal: (producto.respuesta[0].preciocdesc * producto.respuesta[0].lote),
          precioDesc: (producto.respuesta[0].preciocdesc * producto.respuesta[0].lote),
          precioTot: producto.respuesta[0].precio,
          cantidad: producto.respuesta[0].lote,
          claveUnidad: producto.respuesta[0].claveUnidad,
          claveProdServ: producto.respuesta[0].claveProdServ
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
        this.input.nativeElement.value = '';
        this.input.nativeElement.focus();
        this.encontrado = true;
      } else {
        this.encontrado = false;
      }
    });
  }

  cambiarCantidad(producto: any, input: any) {
    this.subtotal = 0;
    this.iva = 0;
    this.total = 0;
    const cantidadAnt = producto.cantidad;
    const division = Number(input) % producto.producto.lote;
    if (division === 0 && input !== '0') {
      producto.precioFinal = (producto.producto.precioneto * Number(input));
      producto.precioTot = (producto.producto.precio * Number(input));
      producto.cantidad = Number(input);

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
    } else {
      const elem = <HTMLInputElement>(document.getElementById('input' + producto.producto.codigo));
      elem.value = cantidadAnt;
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
      swal('Cantidad Incorrecta', 'Solo se pueden ingresar cantidades multiplos de: ' + producto.producto.lote, 'error');
    }
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
    if (this.productos.length > 0) {
      let xml;

      xml = '<?xml version="1.0" encoding="UTF-8" standalone="yes"?>' +
            '<cfdi:Comprobante Version="3.3" Serie="W">' +
              '<cfdi:Receptor Rfc="' + this.cliente.rfc + '" CliNumero="' + this.cliente.numero + '"/>' +
              '<cfdi:Conceptos>';

      const pedido = {
        cliente: this.cliente.numero,
        rfc: this.cliente.rfc,
        surtido: false,
        fecha: this._utilsService.fechaActual(),
        hora: this._utilsService.horaActual(),
        articulos: [],
        log: '',
        usuario: this.cliente._id
      };

      for (let i = 0; i < this.productos.length; i++) {
        // Garantizamos permanencia
        pedido.articulos.push(this.productos[i]);
        // console.log(this.productos[i]);
        xml += '<cfdi:Concepto ClaveProdServ="' + this.productos[i].producto.claveProdServ + '" NoIdentificacion="' + this.productos[i].producto.codigo + '" Cantidad="' + this.productos[i].cantidad + '.000" ClaveUnidad="' + this.productos[i].producto.claveUnidad + '" Unidad="PZ"/>';
      }

      xml +=  '</cfdi:Conceptos>' +
            '</cfdi:Comprobante>';

      // this._webSocket.acciones('aviso-error', pedido);

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
          if (info.status) {
            this.eliminarTodo();
            const envio = {
              cliente: this.cliente,
              pedido: this.productos
            };
            this._webSocket.acciones('aviso-asesor', envio);
            swal('Correcto', 'Su pedido fue enviado correctamente.', 'success');
          } else {
            pedido.log = info.msg;
            this._shoppingCar.enviarPermanencia(pedido).subscribe((resp: any) => {
              if (resp.status) {
                this.eliminarTodo();
                this._webSocket.acciones('aviso-error', pedido);
                swal('Correcto', 'Su pedido fue enviado correctamente.', 'success');
              } else {
                swal('Error', 'Hubo un error al subir su pedido, favor de comunicarse con el administrador del sitio.', 'error');
              }
            });
          }
        });
      });
    } else {
      swal('No hay Productos', 'No se ha ingresado ningún a su pedido.', 'warning');
    }
  }

}
