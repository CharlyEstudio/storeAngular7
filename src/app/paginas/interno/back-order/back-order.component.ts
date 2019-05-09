import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Servicios
import { UsuarioServicesService, ProductosService, ShoppingService } from 'src/app/servicios/servicios.index';

// Links
import { PATH_LINK } from 'src/app/config/config';

// Modelos
import { Producto } from 'src/app/modelos/productos.model';

@Component({
  selector: 'app-back-order',
  templateUrl: './back-order.component.html',
  styles: []
})
export class BackOrderComponent implements OnInit {

  precio: number = 3;
  inicio: string;
  final: string;
  numero: string;
  sindato: boolean = false;

  selectMes: any[] = [];
  seleccionarMes: any = '0';

  backOrder: any[] = [];

  constructor(
    private route: Router,
    private _usuarioService: UsuarioServicesService,
    private _productoService: ProductosService,
    private _shoppingService: ShoppingService
  ) {
    if (this._usuarioService.usuario !== null) {
      this.precio = this._usuarioService.usuario.precio;
    }
    this.numero = this._usuarioService.usuario.numero;

    const h = new Date();
    const mesInt = h.getMonth() + 1;

    let indiceMes = 12;
    for (let i = 0; i < 13; i++) {
      let agregarMes;
      if (i === 0) {
        agregarMes = {
          indice: i,
          mes: mesInt,
          year: h.getFullYear()
        };
      } else {
        if ((mesInt - i) > 0) {
          agregarMes = {
            indice: i,
            mes: (mesInt - i),
            year: h.getFullYear()
          };
        } else {
          agregarMes = {
            indice: i,
            mes: indiceMes,
            year: h.getFullYear() - 1
          };
          indiceMes--;
        }
      }
      this.selectMes.push(agregarMes);
      this.seleccionarMes = agregarMes;
    }
  }

  ngOnInit() {
    this.obtenerBackOrder();
  }

  obtenerBackOrder() {
    let mes;
    if (this.seleccionarMes.mes < 10) {
      mes = '0' + this.seleccionarMes.mes;
    } else {
      mes = this.seleccionarMes.mes;
    }
    const diaFinal = new Date(this.seleccionarMes.year, this.seleccionarMes.mes, 0).getDate();
    this.inicio = this.seleccionarMes.year + '-' + mes + '-' + diaFinal;
    this.final = this.seleccionarMes.year + '-' + mes + '-01';
    this._productoService.obtenerBackOrder(this.numero, this.inicio, this.final, this.precio).subscribe((back: any) => {
      if (back.status) {
        this.backOrder = back.respuesta;
        this.sindato = false;
      } else {
        this.sindato = true;
      }
    });
  }

  irA(producto: any) {
    this.route.navigate(['/ver/', producto.ARTICULOID]);
    // this.route.navigate(['/ver/', producto.articuloid]);
  }

  enviarPedido(backOrder: any) {
    this.route.navigate(['/pedido'], { queryParams:  { dato: JSON.stringify(backOrder) } });
  }

}
