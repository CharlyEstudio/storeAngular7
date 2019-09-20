import { Injectable, EventEmitter } from '@angular/core';

@Injectable()
export class BotoncomprarService {

  agregar = new EventEmitter<any>();

  constructor() { }
}
