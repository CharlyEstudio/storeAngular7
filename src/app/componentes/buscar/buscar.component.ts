import { Component, OnInit, ViewChild, Input, Output, ElementRef, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styles: []
})
export class BuscarComponent implements OnInit {

  @ViewChild('input')  input: ElementRef;
  // tslint:disable-next-line:no-output-rename
  @Output('actualizaValor') cambioValor: EventEmitter<any> = new EventEmitter();

  constructor( ) { }

  ngOnInit() {
  }

  buscar(termino: any) {
    this.input.nativeElement.value = termino;

    this.cambioValor.emit( termino );
  }

}
