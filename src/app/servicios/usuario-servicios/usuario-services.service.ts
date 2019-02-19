import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import 'rxjs';

// URL PRINCIPAL
import { LINK } from 'src/app/config/config';

// Modelos
import { Usuario } from 'src/app/modelos/usuarios.model';

@Injectable()
export class UsuarioServicesService {

  private session: BehaviorSubject<Usuario[]> = new BehaviorSubject([]);
  private user: Usuario[] = [];

  usuario: Usuario;
  token: string;
  menu: any[] = [];
  rol: any;

  constructor(
    public router: Router,
    private http: HttpClient
  ) {
    this.cargarStorage();
    this.session.subscribe(login => {
      let status;
      if (login) {
        if (login.length > 0) {
          status = login;
        } else {
          status = [];
        }
      } else {
        status = [];
      }
      return this.user = status;
    });
  }

  isSession() {
    return this.session;
  }

  iniciar(usuario: Usuario) {
    this.session.next([...this.user, usuario]);
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

  guardarStorage(id: string, token: string, usuario: Usuario, menu: any, rol: any, vigente: any) {
    localStorage.setItem( 'id', id );
    localStorage.setItem( 'token', token );
    localStorage.setItem( 'usuario', JSON.stringify( usuario ));
    localStorage.setItem( 'menu', JSON.stringify( menu ));
    localStorage.setItem( 'rol', rol);
    localStorage.setItem( 'vigente', vigente);

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }

  fechaActual() {
    const h = new Date();

    let dia;

    if (h.getDate() < 10) {
      dia = '0' + h.getDate();
    } else {
      dia = h.getDate();
    }

    let mes;

    if (h.getMonth() < 10) {
      mes = '0' + (h.getMonth() + 1);
    } else {
      mes = (h.getMonth() + 1);
    }

    const anio = h.getFullYear();

    const fecha = anio + '-' + mes + '-' + dia;

    return fecha;
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
    localStorage.removeItem('login');
    localStorage.removeItem('vigente');

    this.router.navigate(['/inicio']);
    this.session.next([]);
    return this.session;
  }

  login( usuario: Usuario, recordar: boolean = false ) {
    if ( recordar ) {
      localStorage.setItem( 'emailStore', usuario.email );
    } else {
      localStorage.removeItem( 'emailStore' );
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

  superheros(numero: any) {
    const url = LINK + '/superhero/super/' + numero;

    return this.http.get(url);
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

  obtenerDatos(numero: any) {
    const url = LINK + '/cobertura/cliente/' + numero;

    return this.http.get(url);
  }

}
