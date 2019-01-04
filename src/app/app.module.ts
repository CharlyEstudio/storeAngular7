import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Rutas
import { APP_ROUTES } from './app.routes';

// Enviroment
import { environment } from '../environments/environment';

// Sockets
// import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
// const config: SocketIoConfig = { url: environment.wsUrl, options: {} };

// Servicios & Guardias
import { ServicioModule } from './servicios/servicios.module';

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
import { FavoritosComponent } from './favoritos/favoritos.component';
import { CarritoComponent } from './carrito/carrito.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { NavPrincipalComponent } from './componentes/nav-principal/nav-principal.component';
import { FooterComponent } from './componentes/footer/footer.component';

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
    FavoritosComponent,
    CarritoComponent,
    BuscadorComponent,
    NavPrincipalComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServicioModule
    // SocketIoModule.forRoot(config)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
