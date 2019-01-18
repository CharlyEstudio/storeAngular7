import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Graficas ng2-charts
import { ChartsModule } from 'ng2-charts';

// Rutas Internas
import { PAGES_ROUTES } from './paginas.routes';

// Pipes
import { PipesModule } from '../servicios/pipes/pipes.module';

// Componentes - Páginas Internas
import { DistComponent } from './interno/dist/dist.component';
import { ComprasComponent } from './interno/compras/compras.component';
import { EdoCtaComponent } from './interno/edo-cta/edo-cta.component';
import { FacturasComponent } from './interno/facturas/facturas.component';
import { BonoComponent } from './interno/bono/bono.component';
import { BackOrderComponent } from './interno/back-order/back-order.component';
import { TopVentasComponent } from './interno/top-ventas/top-ventas.component';
import { FavoritosComponent } from './interno/favoritos/favoritos.component';
import { OfertasComponent } from './interno/ofertas/ofertas.component';
import { PerfilComponent } from './interno/perfil/perfil.component';

@NgModule({
    declarations: [
        DistComponent,
        ComprasComponent,
        EdoCtaComponent,
        FacturasComponent,
        BonoComponent,
        BackOrderComponent,
        TopVentasComponent,
        FavoritosComponent,
        OfertasComponent,
        PerfilComponent
    ],
    exports: [
        ComprasComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ChartsModule,
        PAGES_ROUTES,
        PipesModule
    ]
})

export class PaginasModule { }
