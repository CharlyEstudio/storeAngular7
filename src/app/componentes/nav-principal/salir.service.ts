import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class SalirService {

  public notificacion = new EventEmitter<boolean>();

  constructor() { }

}