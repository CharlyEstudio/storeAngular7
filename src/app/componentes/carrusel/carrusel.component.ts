import { Component, OnInit } from '@angular/core';

// Servicios
import { ShoppingService } from 'src/app/servicios/servicios.index';

@Component({
  selector: 'app-carrusel',
  templateUrl: './carrusel.component.html',
  styles: []
})
export class CarruselComponent implements OnInit {

  desc: number = 0;

  constructor(
    private _shoppingService: ShoppingService
  ) {
    this._shoppingService.descPromotruper().subscribe((descuento: any) => {
      if (descuento.status) {
        this.desc = descuento.respuesta[0].DESCU;
      }
    });
  }

  ngOnInit() {
  }

}
