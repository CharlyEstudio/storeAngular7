import { Component, OnInit } from '@angular/core';

// Modelos
import { Usuario } from 'src/app/modelos/usuarios.model';

// Servicios
import { ShoppingService, WebsocketService, UsuarioServicesService } from 'src/app/servicios/servicios.index';
import { PATH_LINK } from 'src/app/config/config';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styles: []
})
export class ComprasComponent implements OnInit {

  usuario: Usuario;
  fecha: any;

  allPed: any[] = [];
  partidas: any[] = [];

  porBajarCant: number = 0;
  porSurtirCant: number = 0;
  facturadoCant: number = 0;

  pedidosBol: boolean = false;

  // Modal
  estatus: any;
  factura: any;

  constructor(
    private _shoppingService: ShoppingService,
    private _usuarioService: UsuarioServicesService,
    private _socketServide: WebsocketService
  ) {
    // this._socketServide.escuchar('').subscribe();
    this.usuario = this._usuarioService.usuario;
    this.fecha = this._usuarioService.fechaActual();
    this.actualizar();
  }

  ngOnInit() {}

  openModal(data: any, estado: any) {
    this.partidas = [];
    this.factura = data.numero;
    this.estatus = estado;
    this._shoppingService.partidas(data.docid).subscribe((partidas: any) => {
      if (partidas.status) {
        this.partidas = partidas.respuesta;
      }
    });
  }

  actualizar() {
    this.pedidosBol = false;
    this.allPed = [];
    this.porBajarCant = 0;
    this.porSurtirCant = 0;
    this.facturadoCant = 0;
    this._shoppingService.allPedidos(this.usuario, this.fecha).subscribe((allPed: any) => {
      if (allPed.status) {
        this.allPed = allPed.respuesta;
        for (let i = 0; i < allPed.respuesta.length; i++) {
          if (allPed.respuesta[i].tipo === 'POR BAJAR') {
            this.porBajarCant += Number(allPed.respuesta[i].cantidad);
          }
          if (allPed.respuesta[i].tipo === 'POR SURTIR') {
            this.porSurtirCant += Number(allPed.respuesta[i].cantidad);
          }
          if (allPed.respuesta[i].tipo === 'FACTURADO') {
            this.facturadoCant += Number(allPed.respuesta[i].cantidad);
          }
        }
        this.pedidosBol = true;
      }
    });
    this.pedidosBol = true;
  }

}
