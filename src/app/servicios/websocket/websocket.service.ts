import { Injectable } from '@angular/core';

import { Socket } from 'ngx-socket-io';

@Injectable()
export class WebsocketService {

  socketStatus: boolean = false;

  constructor(
    private socket: Socket
  ) {
    this.checarEstatus();
  }

  checarEstatus() {
    this.socket.on('connect', () => {
      this.socketStatus = true;
      console.log('On-Line');
    });

    this.socket.on('disconnect', () => {
      this.socketStatus = false;
      console.log('Off-Line');
    });
  }

  acciones( evento: string, payload?: any, callback?: Function ) {
    this.socket.emit(evento, payload, callback);
  }

  escuchar( evento: string ) {
    return this.socket.fromEvent(evento);
  }

  login( nombre: string, email: string, password: string, sala: string ) {
    return new Promise( ( resolve, reject ) => {

      this.acciones( 'configurar-usuario', { nombre, email, password, sala }, resp => {
        resolve();
      });

    });
  }
}
