import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Servicios
import { ShoppingService } from '../servicios/servicios.index';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: []
})
export class InicioComponent implements OnInit {

  desc: number = 0;
  descuentos: any[] = [];

  constructor(
    public router: Router,
    private _shoppingService: ShoppingService
  ) {
    this._shoppingService.descPromotruper().subscribe((descuento: any) => {
      if (descuento.status) {
        this.desc = descuento.respuesta.length;
        this.descuentos = descuento.respuesta;
      }
    });
  }

  ngOnInit() {
  }

  irOfertas() {
    this.router.navigate(['/ofertas']);
  }

  irDesc(desc: any) {
    this.router.navigate(['/descuentos', desc.INVDESCUENTO]);
  }

}
