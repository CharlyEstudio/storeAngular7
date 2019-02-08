import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Modelos
import { Usuario } from '../modelos/usuarios.model';

// Servicios
import { UsuarioServicesService, DatosService } from '../servicios/servicios.index';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {
  forma: FormGroup;

  constructor(
    public router: Router,
    public _usuarioService: UsuarioServicesService,
    public _datosService: DatosService
  ) { }

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
      nombre: new FormControl(null, Validators.required),
      numero: new FormControl(null, Validators.nullValidator),
      email: new FormControl(null, Validators.required),
      pass: new FormControl(null, Validators.required),
      passVal: new FormControl(null, Validators.required),
      condiciones: new FormControl(null, Validators.required),
      factura: new FormControl(null, Validators.nullValidator)
    }, { validators: this.sonIguales('pass', 'passVal') });

    // this.forma.setValue({
    //   nombre: 'Carlos',
    //   numero: '', // 03804
    //   email: 'me@me.com',
    //   pass: 'Charly098',
    //   passVal: 'Charly098',
    //   condiciones: false,
    //   factura: false
    // });
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
          usuario = new Usuario(
            cliente.respuesta[0].NOMBRE,
            this.forma.value.email,
            this.forma.value.pass,
            this.forma.value.factura,
            this.forma.value.numero,
            cliente.respuesta[0].CLIENTEID,
            cliente.respuesta[0].CATALOGO,
            cliente.respuesta[0].DIAVIS,
            cliente.respuesta[0].VENDEDORID,
            'DIST_ROLE',
            cliente.respuesta[0].LISTA,
            cliente.respuesta[0].RFC,
          );
        } else {
          usuario = new Usuario(
            this.forma.value.nombre,
            this.forma.value.email,
            this.forma.value.pass,
            this.forma.value.factura
          );
        }

        this._usuarioService.crearCliente( usuario )
        .subscribe( (resp: any) => {
          if (resp.status) {
            swal ('Usuario creado', usuario.email + '. El administrador activará su cuenta.', 'success');
          } else {
            swal('Error al Crear Usuario' , resp.msg, 'error');
          }
        });
      });
    } else {
      usuario = new Usuario(
        this.forma.value.nombre,
        this.forma.value.email,
        this.forma.value.pass,
        this.forma.value.factura
      );

      this._usuarioService.crearCliente( usuario )
      .subscribe( (resp: any) => {
        if (resp.status) {
          swal ('Usuario creado', usuario.email + '. El administrador activará su cuenta.', 'success');
        } else {
          swal('Error al Crear Usuario' , resp.msg, 'error');
        }
      });
    }

    this.router.navigate(['/acceso']);
  }

}
