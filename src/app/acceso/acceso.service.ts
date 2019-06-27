import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class AccesoService {

  public notificacion = new EventEmitter<boolean>();

  constructor() { }

}