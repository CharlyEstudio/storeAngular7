import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-principal',
  templateUrl: './nav-principal.component.html',
  styles: []
})
export class NavPrincipalComponent implements OnInit {

  buscador: string;

  cantidad = 0;

  // Booleanos
  logeado = false;
  carrito = false;

  constructor() { }

  ngOnInit() {
  }

}
