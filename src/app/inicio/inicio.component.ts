import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styles: []
})
export class InicioComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit() {
  }

  irOfertas() {
    this.router.navigate(['/ofertas']);
  }

}
