import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import 'rxjs';

// URL PRINCIPAL
import { LINK, PATH_LINK } from 'src/app/config/config';

// Modelos
import { Usuario } from 'src/app/modelos/usuarios.model';

// Servicios
import { DatosService } from '../datos/datos.service';

@Injectable()
export class UsuarioServicesService {

  private session: BehaviorSubject<Usuario[]> = new BehaviorSubject([]);
  private user: Usuario[] = [];

  usuario: Usuario;
  token: string = '';
  menu: any[] = [];
  rol: any;

  constructor(
    public router: Router,
    private http: HttpClient,
    private _datosService: DatosService
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
      localStorage.setItem( 'clienteStore', usuario.numero );
    } else {
      localStorage.removeItem( 'clienteStore' );
    }

    const url = LINK + '/clientes/login';

    return this.http.post( url, usuario )
      .pipe(map((data: any) => {
        if (data.status) {
          const fecha = this.fechaActual();
          this.token = data.token;
          this.usuario = data.usuario;
          this.menu = data.menu;
          this.rol = data.usuario.rol;
          this._datosService.obtenerSaldo(fecha, data.usuario.numero).subscribe((saldo: any) => {
            if (saldo.status) {
              let saldoVenc: number = 0;
              for (let i = 0; i < saldo.respuesta.length; i++) {
                if (saldo.respuesta[i].vence < fecha) {
                  saldoVenc += saldo.respuesta[i].saldo;
                }
              }

              if (saldoVenc > 0) {
                this.superheros(data.usuario.numero).subscribe((supers: any) => {
                  if (supers.status) {
                    this.guardarStorage(data.usuario._id, data.token, data.usuario, data.menu, data.usuario.rol, true);
                  } else {
                    this.guardarStorage(data.usuario._id, data.token, data.usuario, data.menu, data.usuario.rol, false);
                  }
                });
              } else {
                this.guardarStorage(data.usuario._id, data.token, data.usuario, data.menu, data.usuario.rol, true);
              }
              this.iniciar(usuario);
              this.cargarStorage();
            } else {
              this.guardarStorage(data.usuario._id, data.token, data.usuario, data.menu, data.usuario.rol, true);
              this.iniciar(usuario);
              this.cargarStorage();
            }
          });
          return data;
        } else {
          return data;
        }
      }));
  }

  renuevaToken() {
    let url = LINK + '/login/renuevatoken';

    url += '?token=' + this.token;

    return this.http.get( url )
      .pipe(map( ( resp: any ) => {

        this.token = resp.token;
        localStorage.setItem('token', this.token);

        return true;
      }));
  }

  enviarConsulta(info: any) {
    const url = `${PATH_LINK}/api/clientes.php?opcion=12`;
    return this.http.post(url, {data: info}, { headers: { 'content-Type': 'application/x-www-form-urlencoded' } });
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
