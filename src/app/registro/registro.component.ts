import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as _swal from 'sweetalert';
import { SweetAlert } from 'sweetalert/typings/core'; // Importante para que funcione el sweet alert
const swal: SweetAlert = _swal as any;

// Modelos
import { Usuario } from '../modelos/usuarios.model';

// Servicios
import { UsuarioServicesService, DatosService, WebsocketService } from '../servicios/servicios.index';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {
  forma: FormGroup;
  contacto: FormGroup;

  esperando: boolean = false;
  existe: boolean = false;
  dist: boolean = false;
  correcto: boolean = true;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioServicesService,
    private _webSocket: WebsocketService,
    public _datosService: DatosService
  ) {}

  sonIguales( campo1: string, campo2: string ) {
    return ( group: FormGroup ) => {
      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return { sonIguales: true };
    };
  }

  ngOnInit() {
    this.forma = new FormGroup({
      // nombre: new FormControl(null, Validators.required),
      numero: new FormControl(null, Validators.nullValidator),
      email: new FormControl(null, Validators.required),
      pass: new FormControl(null, Validators.required),
      passVal: new FormControl(null, Validators.required),
      condiciones: new FormControl(null, Validators.required)
      // factura: new FormControl(null, Validators.nullValidator)
    }, { validators: this.sonIguales('pass', 'passVal') });

    this.contacto = new FormGroup({
      nom_contacto: new FormControl(null, Validators.required),
      email_contacto: new FormControl(null, Validators.required),
      telefono_contacto: new FormControl(null, Validators.required),
      comentario: new FormControl(null, Validators.required),
      direccion: new FormControl(null, Validators.required)
    });

    // this.forma.setValue({
    //   nombre: 'Carlos',
    //   numero: '03804', // 03804
    //   email: 'me@me.com',
    //   pass: 'Charly098',
    //   passVal: 'Charly098',
    //   condiciones: false,
    //   factura: false
    // });
  }

  buscarNumero() {
    this.correcto = true;
    if (this.forma.value.numero !== null && this.forma.value.numero !== '') {
      this._datosService.obtenerClienteFerrum(this.forma.value.numero).subscribe((resp: any) => {
        if (resp.status) {
          this.dist = true;
          this.existe = true;
        } else {
          this.dist = true;
          this.existe = false;
        }
      });
    } else {
      this.dist = false;
      this.existe = false;
    }
  }

  registrar() {
    if ( this.forma.invalid ) {
      return;
    }

    if ( !this.forma.value.condiciones ) {
      swal('Importante!', 'Debe de aceptar las condiciones!', 'warning');
      return;
    }

    let usuario;

    if (this.forma.value.numero !== '') {
      this._datosService.obtenerClienteFerrum(this.forma.value.numero).subscribe(( cliente: any ) => {
        if (cliente.status) {
          this.correcto = true;
          usuario = new Usuario(
            cliente.respuesta[0].NOMBRE,
            this.forma.value.numero,
            this.forma.value.pass,
            this.forma.value.email,
            true,
            cliente.respuesta[0].CLIENTEID,
            cliente.respuesta[0].CATALOGO,
            cliente.respuesta[0].DIAVIS,
            cliente.respuesta[0].VENDEDORID,
            'DIST_ROLE',
            cliente.respuesta[0].LISTA,
            cliente.respuesta[0].RFC,
            'NOT',
          );
          this._usuarioService.crearCliente( usuario )
          .subscribe( (resp: any) => {
            if (resp.status) {
              this._webSocket.acciones('registro-watch', usuario);
              swal ('Usuario creado', usuario.numero + '. Se envío un correo a tu email para activar tu cuenta.', 'success');
              this.router.navigate(['/acceso']);
            } else {
              swal('Error al Crear Usuario' , resp.msg, 'error');
            }
          });
        } else {
          this.correcto = false;
        }
      });
    } else {
      this.correcto = false;
    }
  }

  comentar() {
    this.esperando = true;
    if ( this.contacto.invalid ) {
      swal('Hay campos sin llenar', 'Debe de ingresar todos los campos', 'error');
      return;
    }
    this._usuarioService.enviarConsulta(this.contacto.value).subscribe((resp: any) => {
      if (resp.length > 0) {
        this.esperando = false;
        this.contacto.reset();
        this._webSocket.acciones('registro-watch', this.contacto.value);
        swal('Envío Correcto', 'Su solicitud fue enviada, nos pondremos en contacto lo más pronto posible.', 'success');
      } else {
        this.esperando = false;
        swal('Error de Envío', 'No pudimos realizar el envío de su solicitud.', 'error');
      }
    });
  }

}
