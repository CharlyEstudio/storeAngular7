import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// Modelos
import { Usuario } from '../modelos/usuarios.model';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: []
})
export class RegistroComponent implements OnInit {
  forma: FormGroup;

  constructor(
    public router: Router
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
      condiciones: new FormControl(null, Validators.required)
    }, { validators: this.sonIguales('pass', 'passVal') });

    this.forma.setValue({
      nombre: 'Carlos',
      numero: '03804',
      email: 'me@me.com',
      pass: 'Charly098',
      passVal: 'Charly098',
      condiciones: false
    });
  }

  registrar() {
    if ( this.forma.invalid ) {
      return;
    }

    if ( !this.forma.value.condiciones ) {
      swal('Importante!', 'Debe de aceptar las condiciones!', 'warning');
      return;
    }

    const usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.pass
    );

    console.log(usuario);

    // this._usuarioService.crearUsuario( usuario )
    //   .subscribe( resp => this.router.navigate(['/login']) );
  }

}
