import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Servicios & Guardias
import { LoginGuard,
    UsuarioServicesService,
    ProductosService,
    DatosService,
    ShoppingService,
    MenuService,
    ExportarService } from './servicios.index';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        // Guardias
        LoginGuard,
        // Servicios
        UsuarioServicesService,
        ProductosService,
        DatosService,
        ShoppingService,
        MenuService,
        ExportarService
    ],
    declarations: []
})

export class ServicioModule {}
