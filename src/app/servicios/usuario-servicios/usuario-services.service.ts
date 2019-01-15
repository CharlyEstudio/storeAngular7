import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

// URL PRINCIPAL
import { LINK } from 'src/app/config/config';

// Modelos
import { Usuario } from 'src/app/modelos/usuarios.model';

@Injectable()
export class UsuarioServicesService {

  constructor(
    private http: HttpClient
  ) { }

  crearUsuario(usuario: Usuario) {
    const url = LINK + '/cliente';

    return this.http.post( url, usuario );
      // .map( (resp: any) => {
      //   swal ('Usuario creado', usuario.email + '. El administrador activará su cuenta.', 'success');
      //   // alert('Usuario creado ' + usuario.email);
      //   return resp.usuario;
      // })
      // .catch( err => {
      //   swal(err.error.mensaje , err.error.errors.message, 'error');
      //   // alert(err.error.mensaje + err.error.errors.message);
      //   return Observable.throw( err );
      // });
  }

}
