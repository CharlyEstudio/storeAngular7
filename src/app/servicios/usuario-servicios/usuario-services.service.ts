import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// URL PRINCIPAL
import { LINK } from 'src/app/config/config';

@Injectable()
export class UsuarioServicesService {

  constructor(
    private http: HttpClient
  ) { }

}
