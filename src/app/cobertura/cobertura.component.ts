import { Component, OnInit } from '@angular/core';

// Servicios
import { DatosService } from '../servicios/servicios.index';

@Component({
  selector: 'app-cobertura',
  templateUrl: './cobertura.component.html',
  styles: []
})
export class CoberturaComponent implements OnInit {

  fecha = Date.now();

  clientes = 0;
  estados = 0;
  municipios = 0;
  pedidos = 0;

  constructor(
    private _datosServices: DatosService
  ) {
    this._datosServices.obtenerEstados().subscribe((estados: any) => {
      this.estados = estados.respuesta.length;
    });

    this._datosServices.obtenerMunicipios().subscribe((municipios: any) => {
      this.municipios = municipios.respuesta.length;
    });

    this._datosServices.obtenerClientes().subscribe((clientes: any) => {
      this.clientes = clientes.respuesta[0].clientes;
    });

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

    const inicio = anio + '-' + '01' + '-' + '01';

    const final = anio + '-' + mes + '-' + dia;

    this._datosServices.obtenerPedidos(inicio, final).subscribe((pedidos: any) => {
      this.pedidos = pedidos.respuesta[0].pedidos;
    });
  }

  ngOnInit() {
  }

}
