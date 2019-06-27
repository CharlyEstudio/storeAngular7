import { Component, OnInit, ViewChild, Input, Output, ElementRef, EventEmitter } from '@angular/core';

// Servicios
import { ProductosService } from 'src/app/servicios/servicios.index';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: []
})
export class BuscarComponent implements OnInit {

  @ViewChild('input')  input: ElementRef;
  @ViewChild('selRes')  selRes: ElementRef;
  // tslint:disable-next-line:no-output-rename
  @Output('actualizaValor') cambioValor: EventEmitter<any> = new EventEmitter();
  datos: any[] = [];

  constructor(
    private _productoService: ProductosService
  ) { }

  ngOnInit() {
  }


  // Con el buscador select
  // buscar(id: any) {
  //   this.datos = [];
  //   this.selRes.nativeElement.value = id;

  //   this.cambioValor.emit( id );
  // }

  // search(termino: any) {
  //   this.datos = [];
  //   if (termino.length >= 3) {
  //     this._productoService.buscarProductos(termino).subscribe((resp: any) => {
  //       if (resp.status) {
  //         this.datos = resp.respuesta;
  //       }
  //     });
  //   }
  // }

  // Con el buscador input
  buscar(dato: any) {
    this.datos = [];
    this.cambioValor.emit( dato );
  }

}
