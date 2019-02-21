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

  porBajar: any[] = [];
  porSurtir: any[] = [];
  facturado: any[] = [];
  partidas: any[] = [];

  porBajarCant: number = 0;
  porBajarImpo: number = 0;
  porSurtirCant: number = 0;
  porSurtirImpo: number = 0;
  facturadoCant: number = 0;
  facturadoImpo: number = 0;

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
    this.factura = data.NUMERO;
    this.estatus = estado;
    this._shoppingService.partidas(data.DOCID).subscribe((partidas: any) => {
      if (partidas.status) {
        this.partidas = partidas.respuesta;
      }
    });
  }

  actualizar() {
    this._shoppingService.porBajar(this.usuario, this.fecha).subscribe((porBajar: any) => {
      if (porBajar.status) {
        this.porBajar = porBajar.respuesta;
        this.porBajarCant = porBajar.respuesta.length;
      }
    });
    this._shoppingService.porSurtir(this.usuario, this.fecha).subscribe((porSurtir: any) => {
      if (porSurtir.status) {
        this.porSurtir = porSurtir.respuesta;
        this.porSurtirCant = porSurtir.respuesta.length;
      }
    });
    this._shoppingService.facturado(this.usuario, this.fecha).subscribe((facturado: any) => {
      if (facturado.status) {
        this.facturado = facturado.respuesta;
        this.facturadoCant = facturado.respuesta.length;
      }
    });
  }

}
