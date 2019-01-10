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
import { FavoritosComponent } from './favoritos/favoritos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { DescripcionComponent } from './descripcion/descripcion.component';

const appRoutes: Routes = [
    { path: 'inicio', component: InicioComponent },
    { path: 'marcaTruper', component: TruperComponent },
    { path: 'marcaFmo', component: FmoComponent },
    { path: 'nosotros', component: NosotrosComponent },
    { path: 'cobertura', component: CoberturaComponent },
    { path: 'registro', component: RegistroComponent },
    { path: 'acceso', component: AccesoComponent },
    { path: 'favoritos', component: FavoritosComponent },
    { path: 'carrito', component: CarritoComponent },
    { path: 'buscador/:buscando', component: BuscadorComponent },
    { path: 'ver/:producto', component: DescripcionComponent },
    {
        path: '',
        component: PaginasComponent,
        canActivate: [LoginGuard],
        loadChildren: './paginas/paginas.module#PaginasModule'
    },
    { path: '**', component: NopagefoundComponent }
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
