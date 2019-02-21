import { RouterModule, Routes } from '@angular/router';

// Guardias
import { LoginGuard } from './servicios/servicios.index';

// Componentes - Páginas
import { PaginasComponent } from './paginas/paginas.component';
import { InicioComponent } from './inicio/inicio.component';
import { TruperComponent } from './truper/truper.component';
import { FmoComponent } from './fmo/fmo.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { CoberturaComponent } from './cobertura/cobertura.component';
import { RegistroComponent } from './registro/registro.component';
import { AccesoComponent } from './acceso/acceso.component';
import { CarritoComponent } from './carrito/carrito.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { DescripcionComponent } from './descripcion/descripcion.component';
import { OfertaComponent } from './oferta/oferta.component';

const appRoutes: Routes = [
    { path: 'inicio', component: InicioComponent, data: { titulo: 'Sitio Oficial Ferremayoristas Olvera', name: 'description' } },
    { path: 'marcaTruper', component: TruperComponent, data: { titulo: 'Marca Truper', name: 'description' } },
    { path: 'marcaFmo', component: FmoComponent, data: { titulo: 'Marca FMO', name: 'description' } },
    { path: 'nosotros', component: NosotrosComponent, data: { titulo: 'Nosotros', name: 'description' } },
    { path: 'cobertura', component: CoberturaComponent, data: { titulo: 'Cobertura', name: 'description' } },
    { path: 'registro', component: RegistroComponent, data: { titulo: 'Registro', name: 'description' } },
    { path: 'acceso', component: AccesoComponent, data: { titulo: 'Acceso', name: 'description' } },
    { path: 'carrito', component: CarritoComponent, data: { titulo: 'Carrito de Compras', name: 'description' } },
    { path: 'buscador/:buscando', component: BuscadorComponent, data: { titulo: 'Buscando...', name: 'description' } },
    { path: 'ver/:producto', component: DescripcionComponent, data: { titulo: 'Descripción', name: 'description' } },
    { path: 'ofertas', component: OfertaComponent, data: { titulo: 'PROMOTRUPER DEL MES', name: 'description' } },
    {
        path: '',
        component: PaginasComponent,
        canActivate: [ LoginGuard ],
        loadChildren: './paginas/paginas.module#PaginasModule'
    },
    { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
