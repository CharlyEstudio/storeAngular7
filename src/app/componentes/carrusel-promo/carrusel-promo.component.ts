import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Servicios
import { ProductosService, UsuarioServicesService } from 'src/app/servicios/servicios.index';

@Component({
  selector: 'app-carrusel-promo',
  templateUrl: './carrusel-promo.component.html',
  styles: []
})
export class CarruselPromoComponent implements OnInit {

  promotruper: any[] = [];
  precarga: any[] = [];

  constructor(
    private router: Router,
    private productoService: ProductosService,
    private usuarioService: UsuarioServicesService
  ) {
    this.precarga = Array(1).fill(4);
    this.obtenerProductos();
  }

  ngOnInit() {
  }

  obtenerProductos() {
    this.productoService.promotruperCarrusel(this.usuarioService.usuario.precio).subscribe((resp: any) => {
      if (resp.status) {
        this.promotruper = resp.respuesta;
      }
    });
  }

  irPorProducto(producto: any) {
    this.router.navigate(['/ver', producto.articuloid]);
  }

}
