import { Component, OnInit } from '@angular/core';

// Modelos
import { Usuario } from '../modelos/usuarios.model';

// Servicios
import { UsuarioServicesService } from '../servicios/servicios.index';
import { Router, ActivationEnd } from '@angular/router';
import { Title, Meta } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';

@Component({
    selector: 'app-paginas',
    templateUrl: './paginas.component.html',
    styles: []
})

export class PaginasComponent implements OnInit {
    usuario: Usuario;
    nombre: any;
    menus: any[] = [];

    titulo: string;
    name: string;

    constructor(
        private router: Router,
        private title: Title,
        private meta: Meta,
        private _usuarioService: UsuarioServicesService
    ) {
        this.getDataRoute().subscribe( data => {
            this.titulo = data.titulo;
            this.name = data.name;
            this.title.setTitle(this.titulo);
            const metaTag = {
                name: this.name,
                content: this.titulo
            };

            this.meta.updateTag( metaTag );
        });
    }

    ngOnInit() {
        this.menus = this._usuarioService.menu;
        this.usuario = this._usuarioService.usuario;
        this.nombre = this._usuarioService.usuario.nombre;
    }

    getDataRoute() {
        return this.router.events.pipe(
          filter( evento => evento instanceof ActivationEnd ),
          filter( (evento: ActivationEnd) => evento.snapshot.firstChild === null ),
          map ( (evento: ActivationEnd) => evento.snapshot.data )
        );

    }
}
