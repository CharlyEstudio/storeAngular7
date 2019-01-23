import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Observable
import { Subscription, Observable, Subscriber } from 'rxjs';

// Modelos
import { UsuarioServicesService, ShoppingService } from 'src/app/servicios/servicios.index';

@Component({
  selector: 'app-nav-principal',
  templateUrl: './nav-principal.component.html',
  styles: []
})
export class NavPrincipalComponent implements OnInit {

  cantidad: number = 0;
  imagen: string = '';
  nombre: string = '';

  // Booleanos
  logeado = false;
  carrito = false;

  constructor(
    private route: Router,
    private _usuarioService: UsuarioServicesService,
    private _shoppingCar: ShoppingService
  ) {
    if (this._usuarioService.usuario !== null) {
      this.imagen = this._usuarioService.usuario.img;
      this.nombre = this._usuarioService.usuario.nombre;
    }
  }

  ngOnInit() {
    this._usuarioService.isSession().subscribe(login => {
      if (login.length !== 0) {
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

    this._shoppingCar.getCarrito().subscribe(data => {
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
  }

  obtener(event: any) {
    this.route.navigate(['/buscador/', event]);
  }

  logout() {
    this._usuarioService.logout();
  }

}
