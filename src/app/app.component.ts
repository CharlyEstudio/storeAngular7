import { Component } from '@angular/core';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';

import { filter, map } from 'rxjs/operators';

// Web Socket
import { WebsocketService } from './servicios/servicios.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  titulo: string;
  name: string;

  constructor(
        private router: Router,
        private title: Title,
        private meta: Meta,
        private _webSocket: WebsocketService
  ) {
    this.getDataRoute().subscribe( data => {
      this.titulo = data.titulo;
      this.name = data.name;
      this.title.setTitle(this.titulo);
      const metaTag = {
        name: this.name,
        content: this.titulo
      };

      this.meta.updateTag( metaTag );
    });
    if (window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition((position: any) => {
        const lugar = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          time: position.timestamp
        };
        // this._webSocket.acciones('visitas-tienda', lugar);
      });
    }
  }

  getDataRoute() {
    return this.router.events.pipe(
      filter( evento => evento instanceof ActivationEnd ),
      filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
      map ( (evento: ActivationEnd) => evento.snapshot.data )
    );

  }
}
