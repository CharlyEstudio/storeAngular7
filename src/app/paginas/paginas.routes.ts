import { Routes, RouterModule } from '@angular/router';

// Guardias
import { LoginGuard } from '../servicios/guards/login.guard';

// Componentes Páginas Iternos
// DIstribución
import { DistComponent } from './interno/dist/dist.component';
import { EdoCtaComponent } from './interno/edo-cta/edo-cta.component';
import { FacturasComponent } from './interno/facturas/facturas.component';
import { BonoComponent } from './interno/bono/bono.component';
import { BackOrderComponent } from './interno/back-order/back-order.component';
import { TopVentasComponent } from './interno/top-ventas/top-ventas.component';
// Tienda
import { ComprasComponent } from './interno/compras/compras.component';
import { FavoritosComponent } from './interno/favoritos/favoritos.component';
import { OfertasComponent } from './interno/ofertas/ofertas.component';
import { PerfilComponent } from './interno/perfil/perfil.component';

const pageRoutes: Routes = [
    // Tienda
    {
        path: 'compras',
        canActivate: [LoginGuard],
        component: ComprasComponent,
        data: { titulo: 'Mis Compras', name: 'description' }
    },
    {
        path: 'favoritos',
        canActivate: [LoginGuard],
        component: FavoritosComponent,
        data: { titulo: 'Mis Favoritos', name: 'description' }
    },
    {
        path: 'ofertas',
        canActivate: [LoginGuard],
        component: OfertasComponent,
        data: { titulo: 'Ofertas', name: 'description' }
    },
    {
        path: 'perfil',
        canActivate: [LoginGuard],
        component: PerfilComponent,
        data: { titulo: 'Perfil', name: 'description' }
    },
    // Distribución
    {
        path: 'dist',
        canActivate: [LoginGuard],
        component: DistComponent,
        data: { titulo: 'Inicio', name: 'description' }
    },
    {
        path: 'edo-cta',
        canActivate: [LoginGuard],
        component: EdoCtaComponent,
        data: { titulo: 'Estado de Cuenta', name: 'description' }
    },
    {
        path: 'facturas',
        canActivate: [LoginGuard],
        component: FacturasComponent,
        data: { titulo: 'Facturas', name: 'description' }
    },
    {
        path: 'bono',
        canActivate: [LoginGuard],
        component: BonoComponent,
        data: { titulo: 'Bono', name: 'description' }
    },
    {
        path: 'back-order',
        canActivate: [LoginGuard],
        component: BackOrderComponent,
        data: { titulo: 'Back Order', name: 'description' }
    },
    {
        path: 'top-ventas',
        canActivate: [LoginGuard],
        component: TopVentasComponent,
        data: { titulo: 'Top Ventas', name: 'description' }
    },
    {
        path: '',
        canActivate: [LoginGuard],
        redirectTo: '/dist',
        pathMatch: 'full'
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pageRoutes );
