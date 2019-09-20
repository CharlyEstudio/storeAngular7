import { Component, OnInit, Input } from '@angular/core';
import { NgForm } from '@angular/forms';

// Servicios
import { ShoppingService } from 'src/app/servicios/servicios.index';
import { BotoncomprarService } from './botoncomprar.service';

// Modelos
import { Producto } from 'src/app/modelos/productos.model';

@Component({
  selector: 'app-botoncomprar',
  templateUrl: './botoncomprar.component.html',
  styles: []
})
export class BotoncomprarComponent implements OnInit {

  @Input() producto: Producto;
  @Input() cantidad: number;

  constructor(
    private _shoppingService: ShoppingService,
    private _botonService: BotoncomprarService
  ) { }

  ngOnInit() {
  }

  agregarCarrito() {
    this.producto.cantidad = this.cantidad;
    this.producto.precioFinal = this.producto.precio * this.cantidad;

    this._shoppingService.guardarCarrito(this.producto);
    this._botonService.agregar.emit(this.producto);
  }

}
