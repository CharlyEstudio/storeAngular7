import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

declare var $: any;

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

  // Booleanos
  verTruper: boolean = true;
  verPretul: boolean = false;
  verVolteck: boolean = false;
  verFoset: boolean = false;
  verFiero: boolean = false;
  verKlintek: boolean = false;
  verHermex: boolean = false;
  verFMO: boolean = false;

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
    // $(document).snowfall();
    // $('#elementid').snowfall({flakeCount : 100, maxSpeed : 1});
  }

  cambiarVista(tipo: any) {
    switch (tipo) {
      case 'truper':
        this.verTruper = true;
        this.verPretul = false;
        this.verVolteck = false;
        this.verFoset = false;
        this.verFiero = false;
        this.verKlintek = false;
        this.verHermex = false;
        this.verFMO = false;
        break;
      case 'pretul':
        this.verTruper = false;
        this.verPretul = true;
        this.verVolteck = false;
        this.verFoset = false;
        this.verFiero = false;
        this.verKlintek = false;
        this.verHermex = false;
        this.verFMO = false;
        break;
      case 'volteck':
        this.verTruper = false;
        this.verPretul = false;
        this.verVolteck = true;
        this.verFoset = false;
        this.verFiero = false;
        this.verKlintek = false;
        this.verHermex = false;
        this.verFMO = false;
        break;
      case 'foset':
        this.verTruper = false;
        this.verPretul = false;
        this.verVolteck = false;
        this.verFoset = true;
        this.verFiero = false;
        this.verKlintek = false;
        this.verHermex = false;
        this.verFMO = false;
        break;
      case 'fiero':
        this.verTruper = false;
        this.verPretul = false;
        this.verVolteck = false;
        this.verFoset = false;
        this.verFiero = true;
        this.verKlintek = false;
        this.verHermex = false;
        this.verFMO = false;
        break;
      case 'klintek':
        this.verTruper = false;
        this.verPretul = false;
        this.verVolteck = false;
        this.verFoset = false;
        this.verFiero = false;
        this.verKlintek = true;
        this.verHermex = false;
        this.verFMO = false;
        break;
      case 'hermex':
        this.verTruper = false;
        this.verPretul = false;
        this.verVolteck = false;
        this.verFoset = false;
        this.verFiero = false;
        this.verKlintek = false;
        this.verHermex = true;
        this.verFMO = false;
        break;
      case 'fmo':
        this.verTruper = false;
        this.verPretul = false;
        this.verVolteck = false;
        this.verFoset = false;
        this.verFiero = false;
        this.verKlintek = false;
        this.verHermex = false;
        this.verFMO = true;
        break;
      default:
          this.verTruper = true;
          this.verPretul = false;
          this.verVolteck = false;
          this.verFoset = false;
          this.verFiero = false;
          this.verKlintek = false;
          this.verHermex = false;
          this.verFMO = false;
    }
  }

  irOfertas() {
    this.router.navigate(['/ofertas']);
  }

  irDesc(desc: any) {
    this.router.navigate(['/descuentos', desc.INVDESCUENTO]);
  }

  entraMouse(event: any) {
    console.log(event);
  }

  saleMouse(event: any) {
    console.log(event);
  }

  buscar(dato: any) {
    console.log(dato);
    this.router.navigate(['/secciones', dato]);
  }

}
