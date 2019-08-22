import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, Observable, Subscriber } from 'rxjs';

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
export class ComprasComponent implements OnInit, OnDestroy {

  // Observable
  observar: Subscription;
  intervalo: any;

  usuario: Usuario;
  fecha: any;

  allPed: any[] = [];
  partidas: any[] = [];
  entrega: any;
  entregando: boolean = false;

  porBajarCant: number = 0;
  porSurtirCant: number = 0;
  facturadoCant: number = 0;
  entregadoCant: number = 0;

  pedidosBol: boolean = false;

  // Modal
  estatus: any;
  factura: any;

  constructor(
    private _shoppingService: ShoppingService,
    private _usuarioService: UsuarioServicesService,
    private _socketServide: WebsocketService
  ) {
    this.usuario = this._usuarioService.usuario;
    this.fecha = this._usuarioService.fechaActual();
    this._socketServide.escuchar('aviso-ir-cliente').subscribe((aviso: any) => {
      if (aviso.status) {
        if (aviso.respuesta.guia.clienteid === this.usuario.idFerrum) {
          this.obtenerReparto(Number(this.usuario.idFerrum));
        }
      }
    });

    this._socketServide.escuchar('pedido-entregado').subscribe((entregado: any) => {
      if (entregado.status) {
        if (entregado.respuesta.cliente === this.usuario.idFerrum) {
          this.obtenerEntregas(Number(this.usuario.idFerrum));
        }
      }
    });

    this.actualizar();

    this.observar = this.regresa().subscribe();
  }

  regresa(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intervalo = setInterval(() => {
        this._shoppingService.allPedidos(this.usuario, this.fecha).subscribe((allPed: any) => {
          if (allPed.status) {
            this.allPed = allPed.respuesta;
            let pedbajar = 0;
            let pedsurtir = 0;
            let pedfacturado = 0;
            for (let i = 0; i < allPed.respuesta.length; i++) {
              if (allPed.respuesta[i].tipo === 'POR BAJAR') {
                pedbajar += Number(allPed.respuesta[i].cantidad);
              }
              if (allPed.respuesta[i].tipo === 'POR SURTIR') {
                pedsurtir += Number(allPed.respuesta[i].cantidad);
              }
              if (allPed.respuesta[i].tipo === 'REMISIONADO') {
                pedfacturado += Number(allPed.respuesta[i].cantidad);
              }
            }
            this.porBajarCant = pedbajar;
            this.porSurtirCant = pedsurtir;
            this.facturadoCant = pedfacturado;
            this.pedidosBol = true;
          }
        });
      }, 5000);
    });
  }

  ngOnInit() {}

  ngOnDestroy() {}

  openModal(data: any) {
    this.partidas = [];
    this.factura = data.numero;
    this.estatus = data.estado;
    this._shoppingService.partidas(data.docid).subscribe((partidas: any) => {
      if (partidas.status) {
        this.partidas = partidas.respuesta;
      }
    });
  }

  actualizar() {
    this.obtenerReparto(Number(this.usuario.idFerrum));
    this.obtenerEntregas(Number(this.usuario.idFerrum));
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
          if (allPed.respuesta[i].tipo === 'REMISIONADO') {
            this.facturadoCant += Number(allPed.respuesta[i].cantidad);
          }
        }
        this.pedidosBol = true;
      }
    });
    this.pedidosBol = true;
  }

  obtenerReparto(clienteid: number) {
    this._shoppingService.obtenerChoferEntrega(clienteid).subscribe((reparto: any) => {
      if (reparto.status) {
        this.entregando = true;
        this.entrega = reparto.respuesta[0];
        this.entregadoCant = reparto.respuesta.length;
      } else {
        this.entregando = false;
        this.entrega = null;
        this.entregadoCant = 0;
      }
    });
  }

  obtenerEntregas(clienteid: number) {
    this._shoppingService.obtenerGuiasEntregados(clienteid).subscribe((entregado: any) => {
      if (entregado.status) {
        this.obtenerReparto(Number(this.usuario.idFerrum));
      }
    });
  }

}
