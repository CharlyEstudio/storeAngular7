import { Routes, RouterModule } from '@angular/router';

// Guardias
import { AdminGuard, VerificaTokenGuard } from '../servicios/servicios.index';

// Componentes Páginas Iternos
// DIstribución
import { DistComponent } from './interno/dist/dist.component';
import { PedidoComponent } from './interno/pedido/pedido.component';
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
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        component: ComprasComponent,
        data: { titulo: 'Mis Compras', name: 'description' }
    },
    {
        path: 'favoritos',
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        component: FavoritosComponent,
        data: { titulo: 'Mis Favoritos', name: 'description' }
    },
    {
        path: 'ofertas',
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        component: OfertasComponent,
        data: { titulo: 'Ofertas', name: 'description' }
    },
    {
        path: 'perfil',
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        component: PerfilComponent,
        data: { titulo: 'Perfil', name: 'description' }
    },
    // Distribución
    {
        path: 'dist',
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        component: DistComponent,
        data: { titulo: 'Mi Escritorio', name: 'description' }
    },
    {
        path: 'pedido',
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        component: PedidoComponent,
        data: { titulo: 'Hacer Pedido', name: 'description' }
    },
    {
        path: 'edo-cta',
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        component: EdoCtaComponent,
        data: { titulo: 'Estado de Cuenta', name: 'description' }
    },
    {
        path: 'facturas',
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        component: FacturasComponent,
        data: { titulo: 'Facturas del Mes', name: 'description' }
    },
    {
        path: 'bono',
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        component: BonoComponent,
        data: { titulo: 'Bono Trmiestral', name: 'description' }
    },
    {
        path: 'back-order',
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        component: BackOrderComponent,
        data: { titulo: 'Back Order', name: 'description' }
    },
    {
        path: 'top-ventas',
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        component: TopVentasComponent,
        data: { titulo: 'Top Ventas', name: 'description' }
    },
    {
        path: '',
        canActivate: [ AdminGuard, VerificaTokenGuard ],
        redirectTo: '/dist',
        pathMatch: 'full'
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pageRoutes );
