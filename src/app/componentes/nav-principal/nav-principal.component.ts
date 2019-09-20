import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

// Servicios
import { UsuarioServicesService, ShoppingService, ProductosService, BotoncomprarService } from 'src/app/servicios/servicios.index';
import { SalirService } from './salir.service';

@Component({
  selector: 'app-nav-principal',
  templateUrl: './nav-principal.component.html',
  styles: []
})
export class NavPrincipalComponent implements OnInit {

  @Output('actualizaValor') cambioValor: EventEmitter<any> = new EventEmitter();

  cantidad: number = 0;

  marcasFmo: any[] = [];
  marcasTru: any[] = [];

  // Booleanos
  logeado = false;
  carrito = false;

  constructor(
    private route: Router,
    private _usuarioService: UsuarioServicesService,
    private _shoppingCar: ShoppingService,
    private _productoService: ProductosService,
    private _salirService: SalirService,
    private _botonService: BotoncomprarService
  ) {
    this._productoService.obtenerMarcasTruper().subscribe((truper: any) => {
      this.marcasTru = truper.respuesta;
    });
    this._productoService.obtenerMarcasFMO().subscribe((fmo: any) => {
      this.marcasFmo = fmo.respuesta;
    });
  }

  ngOnInit() {
    this._usuarioService.isSession().subscribe(login => {
        if (login.length > 0) {
            localStorage.setItem('login', 'ok');
            this.logeado = true;
        } else {
          const sessions = localStorage.getItem('login');
          if (sessions === 'ok') {
            this.logeado = true;
          } else {
            this.logeado = false;
          }
        }
    });

    this._botonService.agregar.subscribe((add: any) => {
      let carrito;
      if (localStorage.getItem('carrito') !== null) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        this.cantidad = carrito.length;
        this.carrito = true;
      } else {
        carrito = [];
        this.cantidad = 0;
        this.carrito = false;
      }
    });

    if (this._shoppingCar.getCarrito() !== null) {
      this.cantidad = this._shoppingCar.getCarrito().length;
      this.carrito = true;
    }

    // this._shoppingCar.getCarrito().subscribe(data => {
    //   let carrito;
    //   if (localStorage.getItem('carrito') !== null) {
    //     carrito = JSON.parse(localStorage.getItem('carrito'));
    //     this.cantidad = carrito.length;
    //     this.carrito = true;
    //   } else {
    //     carrito = [];
    //     this.cantidad = 0;
    //     this.carrito = false;
    //   }
    // });
  }

  obtener(event: any) {
    this.route.navigate(['/buscador/', event]);
  }

  logout() {
    this._usuarioService.logout();
    this._salirService.notificacion.emit(true);
  }

  // irPorMarcas(marca: any) {
  //   this.cambioValor.emit(marca);
  //   this.route.navigate(['/pormarcas', marca]);
  // }

  irMarca(marca: any, menu: any) {
    this.route.navigate(['/marcas', marca, menu]);
  }

}
