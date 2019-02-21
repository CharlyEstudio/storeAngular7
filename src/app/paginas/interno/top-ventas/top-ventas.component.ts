import { Component, OnInit, ɵConsole } from '@angular/core';
import { Router } from '@angular/router';

// Servicios
import { UsuarioServicesService, ProductosService } from 'src/app/servicios/servicios.index';

@Component({
  selector: 'app-top-ventas',
  templateUrl: './top-ventas.component.html',
  styles: []
})
export class TopVentasComponent implements OnInit {

  precio: number = 0;
  numero: string;
  inicio: string;
  final: string;
  sindato: boolean = false;

  topTen: any[] = [];

  constructor(
    private route: Router,
    private _usuarioService: UsuarioServicesService,
    private _productoService: ProductosService
  ) {
    const h = new Date();

    let dia;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    let mes;

    if (h.getMonth() < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    const anio = h.getFullYear();

    if (this._usuarioService.usuario !== null) {
      this.precio = this._usuarioService.usuario.precio;
    }
    this.numero = this._usuarioService.usuario.numero;
    this.inicio = anio + '-' + mes + '-01';
    this.final = anio + '-' + mes + '-' + dia;
  }

  ngOnInit() {
    this.obtenerTopTen();
  }

  obtenerTopTen() {
    this._productoService.obtenerTopTen(this.numero, this.inicio, this.final, this.precio).subscribe((top: any) => {
      if (top.status) {
        this.topTen = top.respuesta;
        this.sindato = false;
      } else {
        this.sindato = true;
      }
    });
  }

  irA(producto: any) {
    this.route.navigate(['/ver/', producto.DESARTID]);
  }

}
