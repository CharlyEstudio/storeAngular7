import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

// Modelos
import { Producto } from '../modelos/productos.model';

// Config
import { LINK } from '../config/config';

// Servicios
import { ProductosService } from 'src/app/servicios/servicios.index';

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: []
})
export class BuscadorComponent implements OnInit, OnDestroy {

  buscando: any;
  buscandoBol = true;
  errorBol = false;
  encontrado: any[] = [];
  encontradoBol = false;

  constructor(
    private route: Router,
    private activateRoute: ActivatedRoute,
    private _productosService: ProductosService
  ) {
    this.route.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.buscando = this.activateRoute.snapshot.params.buscando;
        this.obtenerBusqueda(this.buscando);
      } else {
        this.buscando = '';
      }
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.buscando = '';
  }

  obtenerBusqueda(buscar: any) {
    this.encontrado = [];
    this._productosService.buscarProductos(buscar).subscribe((encontrado: any) => {
      if (encontrado.length > 0) {
        this.buscandoBol = false;
        this.errorBol = false;
        this.encontradoBol = true;
        for (let i = 0; i < encontrado.length; i++) {
          this._productosService.obtenerImagenes(encontrado[i].codigo).subscribe((imagenes: any) => {
            let image;

            if (imagenes.length > 0) {
              image = imagenes[0].imagen;
            } else {
              image = 'product.png';
            }

            const datos: Producto = {
              id: encontrado[i].articuloid,
              descripcion: encontrado[i].descripcion,
              clave: encontrado[i].clave,
              codigo: encontrado[i].codigo,
              precioneto: encontrado[i].precioneto,
              iva: encontrado[i].iva,
              precio: encontrado[i].precio,
              precioAumentado: 0,
              img: LINK + '/assets/img_products/' + image,
              descuento: encontrado[i].descuento,
              entregado: encontrado[i].entregado,
            };

            this.encontrado.push(datos);
          });
        }
      } else {
        this.encontrado = [];
        this.buscandoBol = false;
        this.errorBol = true;
        this.encontradoBol = false;
      }
    });
  }

  irA(producto: Producto) {
    this.route.navigate(['/ver/', producto.id]);
  }

  comeBack() {
    window.history.back();
  }

}
