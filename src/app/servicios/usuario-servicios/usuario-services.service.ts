import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import 'rxjs';

// URL PRINCIPAL
import { LINK } from 'src/app/config/config';

// Modelos
import { Usuario } from 'src/app/modelos/usuarios.model';

@Injectable()
export class UsuarioServicesService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];
  rol: any;

  constructor(
    public router: Router,
    private http: HttpClient
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return ( this.token.length > 5 ) ? true : false;
  }

  cargarStorage() {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any, rol: any) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ));
    localStorage.setItem( 'menu', JSON.stringify( menu ));
    localStorage.setItem( 'rol', rol);

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];


    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');
    localStorage.removeItem('rol');
    localStorage.removeItem('id');

    this.router.navigate(['/inicio']);
  }

  login( usuario: Usuario, recordar: boolean = false ) {
    if ( recordar ) {
      localStorage.setItem( 'email', usuario.email );
    } else {
      localStorage.removeItem( 'email' );
    }

    const url = LINK + '/clientes/login';

    return this.http.post( url, usuario );
      // .map( ( resp: any ) => {

      //   this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu, resp.usuario.rol);

      //   return true;
      // })
      // .catch( ( err ) => {
      //   swal('Error en el login', err.error.errors.message, 'error');
      //   return Observable.throw( err.error.ok );
      // });
  }

  crearCliente(usuario: Usuario) {
    const url = LINK + '/clientes';

    return this.http.post( url, usuario );
  }

  actualizarUsusario( usuario: Usuario ) {
    let url = LINK + 'clientes/actualizar/' + usuario._id;

    url += '?token=' + this.token;

    return this.http.put( url, usuario );
      // .map( (resp: any) => {
      //   if ( usuario._id === this.usuario._id ) {
      //     const usuarioDB: Usuario = resp.usuario;
      //     this.guardarStorage( usuarioDB._id, this.token, usuarioDB, this.menu, usuarioDB.rol );
      //   }

      //   swal('Usuario Actualizado!', usuario.nombre, 'success');

      //   return true;
      // })
      // .catch( err => {
      //   swal(err.error.mensaje , err.error.errors.message, 'error');
      //   return Observable.throw( err );
      // });
  }

  // cambiarImagen( archivo: File, id: string ) {
  //   this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
  //     .then( ( resp: any ) => {
  //       this.usuario.img = resp.usuario.img;

  //       swal('Imagen Actualizada', this.usuario.nombre, 'success');

  //       this.guardarStorage( id, this.token, this.usuario, this.menu, resp.usuario.rol );
  //     })
  //     .catch( resp => {});
  // }

  borrarUsuario ( id: string ) {
    let url = LINK + '/cliente/borrarcuenta/' + id;

    url += '?token=' + this.token;

    return this.http.delete( url );
      // .map( resp => {
      //   swal('¡Usuario Borrado!', 'El usuario ha sido eliminado correctamente', 'success');
      //   return true;
      // });
  }

}
