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
  municipios = 0;
  pedidos = 0;

  constructor(
    private _datosServices: DatosService
  ) {
    this._datosServices.obtenerMunicipios().subscribe((municipios: any) => {
      this.municipios = municipios.length;
    });

    this._datosServices.obtenerClientes().subscribe((clientes: any) => {
      this.clientes = clientes[0].clientes;
    });

    this._datosServices.obtenerPedidos().subscribe((pedidos: any) => {
      this.pedidos = pedidos[0].pedidos;
    });
  }

  ngOnInit() {
  }

}
