import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Observable
import { Subscription, Observable, Subscriber } from 'rxjs';

@Component({
  selector: 'app-nav-principal',
  templateUrl: './nav-principal.component.html',
  styles: []
})
export class NavPrincipalComponent implements OnInit {

  cantidad = 0;

  // Observar para el carrito
  car: Subscription;
  intervalo: any;

  // Booleanos
  logeado = false;
  carrito = false;

  constructor(
    private route: Router
  ) {
    this.car = this.regresa().subscribe(
      datos => {
        if (datos.length > 0) {
          this.cantidad = datos.length;
          this.carrito = true;
        } else if (datos.articuloid !== undefined) {
          this.cantidad = 1;
          this.carrito = true;
        } else {
          this.cantidad = 0;
          this.carrito = false;
        }
      },
      err => console.error(err),
      () => console.log('Termina')
    );
  }

  regresa(): Observable<any> {
    return new Observable((observer: Subscriber<any>) => {
      this.intervalo = setInterval(() => {
        if (localStorage.getItem('carrito') !== null) {
          observer.next(JSON.parse(localStorage.getItem('carrito')));
        } else {
          observer.next([]);
        }
      }, 100);
    });
  }

  ngOnInit() { }

  obtener(event: any) {
    this.route.navigate(['/buscador/', event]);
  }

}
