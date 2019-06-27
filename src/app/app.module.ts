import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Rutas
import { APP_ROUTES } from './app.routes';

// Graficas ng2-charts
import { ChartsModule } from 'ng2-charts';

// Enviroment
import { environment } from '../environments/environment';

// Sockets
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

// Servicios & Guardias
import { ServicioModule } from './servicios/servicios.module';

// Pipes
import { PipesModule } from './servicios/pipes/pipes.module';

// Componentes - Páginas
import { AppComponent } from './app.component';
import { PaginasComponent } from './paginas/paginas.component';
import { InicioComponent } from './inicio/inicio.component';
import { TruperComponent } from './truper/truper.component';
import { FmoComponent } from './fmo/fmo.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { CoberturaComponent } from './cobertura/cobertura.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { RegistroComponent } from './registro/registro.component';
import { AccesoComponent } from './acceso/acceso.component';
import { CarritoComponent } from './carrito/carrito.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { NavPrincipalComponent } from './componentes/nav-principal/nav-principal.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { CarruselComponent } from './componentes/carrusel/carrusel.component';
import { NuevosProductosComponent } from './componentes/nuevos-productos/nuevos-productos.component';
import { PromocionProductosComponent } from './componentes/promocion-productos/promocion-productos.component';
import { VentaDiaComponent } from './componentes/venta-dia/venta-dia.component';
import { DescripcionComponent } from './descripcion/descripcion.component';
import { BuscarComponent } from './componentes/buscar/buscar.component';
import { GraficaBarrasComponent } from './componentes/grafica-barras/grafica-barras.component';
import { OfertaComponent } from './oferta/oferta.component';
import { DescuentosComponent } from './descuentos/descuentos.component';
import { PormarcasComponent } from './pormarcas/pormarcas.component';
import { SopFacturaComponent } from './sop-factura/sop-factura.component';
import { PolVentaComponent } from './pol-venta/pol-venta.component';
import { PolDevolucionComponent } from './pol-devolucion/pol-devolucion.component';
import { PolGarantiaComponent } from './pol-garantia/pol-garantia.component';
import { ContactoComponent } from './contacto/contacto.component';
import { BolsaTrabajoComponent } from './bolsa-trabajo/bolsa-trabajo.component';
import { SeccionesComponent } from './secciones/secciones.component';

@NgModule({
  declarations: [
    AppComponent,
    PaginasComponent,
    InicioComponent,
    TruperComponent,
    FmoComponent,
    NosotrosComponent,
    CoberturaComponent,
    NopagefoundComponent,
    RegistroComponent,
    AccesoComponent,
    CarritoComponent,
    BuscadorComponent,
    NavPrincipalComponent,
    FooterComponent,
    CarruselComponent,
    NuevosProductosComponent,
    PromocionProductosComponent,
    VentaDiaComponent,
    DescripcionComponent,
    BuscarComponent,
    GraficaBarrasComponent,
    OfertaComponent,
    DescuentosComponent,
    PormarcasComponent,
    SopFacturaComponent,
    PolVentaComponent,
    PolDevolucionComponent,
    PolGarantiaComponent,
    ContactoComponent,
    BolsaTrabajoComponent,
    SeccionesComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServicioModule,
    ChartsModule,
    PipesModule,
    SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
