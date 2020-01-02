import { RouterModule, Routes } from '@angular/router';

// Guardias
import { LoginGuard } from './servicios/servicios.index';

// Componentes - Páginas
import { PaginasComponent } from './paginas/paginas.component';
import { InicioComponent } from './inicio/inicio.component';
import { TruperComponent } from './truper/truper.component';
import { FmoComponent } from './fmo/fmo.component';
import { NosotrosComponent } from './nosotros/nosotros.component';
import { CoberturaComponent } from './cobertura/cobertura.component';
import { RegistroComponent } from './registro/registro.component';
import { AccesoComponent } from './acceso/acceso.component';
import { CarritoComponent } from './carrito/carrito.component';
import { BuscadorComponent } from './buscador/buscador.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { DescripcionComponent } from './descripcion/descripcion.component';
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
import { MarcasComponent } from './marcas/marcas.component';
import { ActivarComponent } from './activar/activar.component';

const appRoutes: Routes = [
    { path: 'inicio', component: InicioComponent, data: { titulo: 'Sitio Oficial Grupo Ferremayoristas del Bajío', name: 'description' } },
    { path: 'marcaTruper', component: TruperComponent, data: { titulo: 'Marca Truper', name: 'description' } },
    { path: 'marcaFmo', component: FmoComponent, data: { titulo: 'Marca FMO', name: 'description' } },
    { path: 'marcas/:marca/:menu', component: MarcasComponent, data: { titulo: 'Marcas', name: 'description' } },
    { path: 'nosotros', component: NosotrosComponent, data: { titulo: 'Nosotros', name: 'description' } },
    { path: 'cobertura', component: CoberturaComponent, data: { titulo: 'Cobertura', name: 'description' } },
    { path: 'registro', component: RegistroComponent, data: { titulo: 'Registro', name: 'description' } },
    { path: 'acceso', component: AccesoComponent, data: { titulo: 'Acceso', name: 'description' } },
    { path: 'carrito', component: CarritoComponent, data: { titulo: 'Carrito de Compras', name: 'description' } },
    { path: 'buscador/:buscando', component: BuscadorComponent, data: { titulo: 'Buscando...', name: 'description' } },
    { path: 'ver/:producto', component: DescripcionComponent, data: { titulo: 'Descripción', name: 'description' } },
    { path: 'ofertas', component: OfertaComponent, data: { titulo: 'PROMOTRUPER DEL MES', name: 'description' } },
    { path: 'descuentos/:desc', component: DescuentosComponent, data: { titulo: 'DESCUENTO DEL MES', name: 'description' } },
    { path: 'pormarcas/:nombre/:buscar/:familia/:menu', component: PormarcasComponent, data: { titulo: 'PRODCUTO POR MARCA', name: 'description' } },
    { path: 'sop-factura', component: SopFacturaComponent, data: { titulo: 'Soporte al cliente - Facturación', name: 'description' } },
    { path: 'pol-venta', component: PolVentaComponent, data: { titulo: 'Políticas - Ventas', name: 'description' } },
    { path: 'pol-devolucion', component: PolDevolucionComponent, data: { titulo: 'Políticas - Devoluciones', name: 'description' } },
    { path: 'pol-garantia', component: PolGarantiaComponent, data: { titulo: 'Políticas - Garantías', name: 'description' } },
    { path: 'contacto', component: ContactoComponent, data: { titulo: 'Contáctanos', name: 'description' } },
    { path: 'bolsa-trabajo', component: BolsaTrabajoComponent, data: { titulo: 'Bolsa de Trabajo', name: 'description' } },
    { path: 'secciones/:seccion', component: SeccionesComponent, data: { titulo: 'Sección', name: 'description' } },
    { path: 'activar/:token', component: ActivarComponent, data: { titulo: 'Activar Cuenta', name: 'description' } },
    {
        path: '',
        component: PaginasComponent,
        canActivate: [ LoginGuard ],
        loadChildren: './paginas/paginas.module#PaginasModule'
    },
    { path: '**', redirectTo: '/inicio', pathMatch: 'full' } // Aquí arregle para que redirigiera a inicio
];

export const APP_ROUTES = RouterModule.forRoot( appRoutes, { useHash: true } );
