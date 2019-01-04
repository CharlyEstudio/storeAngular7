import { Routes, RouterModule } from '@angular/router';

// Guardias
import { LoginGuard } from '../servicios/guards/login.guard';
// import { } form '../services/';

// Componentes Páginas Iternos
import { DashboardComponent } from './dashboard/dashboard.component';

const pageRoutes: Routes = [
    {
        path: 'dashboard',
        canActivate: [],
        component: DashboardComponent,
        data: { titulo: 'Dashboard Cliente', name: 'description' }
    },
    {
        path: '',
        canActivate: [],
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }
];

export const PAGES_ROUTES = RouterModule.forChild( pageRoutes );
