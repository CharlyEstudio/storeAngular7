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
    // this.intervalo = setInterval(() => {
    //   if (document.getElementById('truper').addEventListener) {
    //     document.getElementById('truper').addEventListener('play', (video: any) => console.log(video.srcElement.duration));
    //     clearInterval(this.intervalo);
    //   } else {
    //     const elem = <HTMLVideoElement>(document.getElementById('truper'));
    //     elem.play();
    //   }
    // }, 1000);
    const elem = <HTMLVideoElement>(document.getElementById('truper'));
    elem.muted = true;
  }

  ngOnDestroy() {
    // clearInterval(this.intervalo);
  }

}
