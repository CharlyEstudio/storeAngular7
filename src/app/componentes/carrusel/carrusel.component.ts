import { Component, OnInit, OnDestroy } from '@angular/core';

// Servicios
import { ShoppingService } from 'src/app/servicios/servicios.index';

// Video
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styles: []
})
export class CarruselComponent implements OnInit, OnDestroy {

  desc: number = 0;
  movie: any = 'http://ferremayoristas.com.mx/movie/banner3.mp4';
  src: any;
  intervalo: any;

  constructor(
    private _sanitizer: DomSanitizer,
    private _shoppingService: ShoppingService
  ) {
    this._shoppingService.descPromotruper().subscribe((descuento: any) => {
      if (descuento.status) {
        this.desc = descuento.respuesta[0].DESCU;
      }
    });
  }

  ngOnInit() {
    // Para funcione correctamente el vídeo
    // const elem = <HTMLVideoElement>(document.getElementById('truper'));
    // elem.muted = true;
  }

  ngOnDestroy() {
    // clearInterval(this.intervalo);
  }

}
