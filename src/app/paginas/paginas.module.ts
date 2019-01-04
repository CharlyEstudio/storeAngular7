import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Graficas ng2-charts
import { ChartsModule } from 'ng2-charts';

// Componentes - Páginas Internas
import { DashboardComponent } from './dashboard/dashboard.component';

// Rutas Internas
import { PAGES_ROUTES } from './paginas.routes';

@NgModule({
    declarations: [
        DashboardComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ChartsModule,
        PAGES_ROUTES
    ]
})

export class PaginasModule { }
