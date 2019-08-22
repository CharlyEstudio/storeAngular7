import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// Rutas Internas
import { PAGES_ROUTES } from './paginas.routes';

// Pipes
import { PipesModule } from '../servicios/pipes/pipes.module';

// Charts
import { ChartsModule } from 'ng2-charts';

// Componentes - Páginas Internas
import { DistComponent } from './interno/dist/dist.component';
import { PedidoComponent } from './interno/pedido/pedido.component';
import { ComprasComponent } from './interno/compras/compras.component';
import { EdoCtaComponent } from './interno/edo-cta/edo-cta.component';
import { FacturasComponent } from './interno/facturas/facturas.component';
import { BonoComponent } from './interno/bono/bono.component';
import { BackOrderComponent } from './interno/back-order/back-order.component';
import { TopVentasComponent } from './interno/top-ventas/top-ventas.component';
import { FavoritosComponent } from './interno/favoritos/favoritos.component';
import { OfertasComponent } from './interno/ofertas/ofertas.component';
import { PerfilComponent } from './interno/perfil/perfil.component';
import { GraficaLinealComponent } from '../componentes/grafica-lineal/grafica-lineal.component';
import { CarruselPromoComponent } from '../componentes/carrusel-promo/carrusel-promo.component';

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
        PerfilComponent,
        GraficaLinealComponent,
        PedidoComponent,
        CarruselPromoComponent
    ],
    exports: [
        ComprasComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        PAGES_ROUTES,
        PipesModule,
        ChartsModule
    ]
})

export class PaginasModule { }
