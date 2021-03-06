import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Servicios & Guardias
import {
    LoginGuard,
    AdminGuard,
    VerificaTokenGuard,
    UsuarioServicesService,
    ProductosService,
    DatosService,
    ShoppingService,
    MenuService,
    ExportarService,
    WebsocketService,
    BotoncomprarService,
    UtilsService
} from './servicios.index';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        // Guardias
        LoginGuard,
        AdminGuard,
        VerificaTokenGuard,
        // Servicios
        UsuarioServicesService,
        ProductosService,
        DatosService,
        ShoppingService,
        MenuService,
        ExportarService,
        WebsocketService,
        BotoncomprarService,
        UtilsService
    ],
    declarations: []
})

export class ServicioModule {}
