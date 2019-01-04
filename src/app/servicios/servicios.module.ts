import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Servicios
import { LoginGuard } from './guards/login.guard';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        // Guardias
        LoginGuard
    ],
    declarations: []
})

export class ServicioModule {}
