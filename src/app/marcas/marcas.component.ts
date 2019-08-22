import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

// Servicios
import { ProductosService } from 'src/app/servicios/servicios.index';

@Component({
  selector: 'app-marcas',
  templateUrl: './marcas.component.html',
  styles: []
})
export class MarcasComponent implements OnInit {

  marca: any = '';
  marcas: any[] = [];
  dividirMarcas: any[] = [];
  precarga: any[] = [];
  imagen: any;

  constructor(
    public sanitizer: DomSanitizer,
    private router: ActivatedRoute,
    private route: Router,
    private _productoService: ProductosService
  ) {
    this.precarga = Array(8).fill(4);
    this.route.events.subscribe((event: any) => {
      if (event instanceof NavigationEnd) {
        this.marcas = [];
        this.marca = '';
        this.marca = this.router.snapshot.paramMap.get('marca');
        this.obtenerMarcas();
      }
    });
  }

  ngOnInit() {
  }

  irPorMarcas(marca: any) {
    this.route.navigate(['/pormarcas', marca.marca, marca.img, this.marca]);
  }

  obtenerMarcas() {
    this.marcas = [];
    if (this.marca === 'Truper') {
      this._productoService.obtenerMarcasTruper().subscribe((truper: any) => {
        if (truper.status) {
          this.marcas = truper.respuesta;
          this.dividirMarcas = truper.respuesta;
        }
      });
    } else if (this.marca === 'Fmo') {
        this._productoService.obtenerMarcasFMO().subscribe((fmo: any) => {
          if (fmo.status) {
            this.marcas = fmo.respuesta;
            this.dividirMarcas = fmo.respuesta;
          }
        });
    }
  }

  elegirMenu(seccion: number) {
    const array = [];
    switch (seccion) {
      case 1:
        this.marcas = [];
        this.marcas = this.dividirMarcas;
        break;
      case 2:
        this.marcas = [];
        this.marcas = this.dividirMarcas;
        for (const mc of this.marcas) {
          if (mc.marca !== 'Generico') {
            array.push(mc);
          }
        }
        this.marcas = array;
      break;
      case 3:
        this.marcas = [];
        this.marcas = this.dividirMarcas;
        for (const mc of this.marcas) {
          if (mc.marca === 'Generico') {
            array.push(mc);
          }
        }
        this.marcas = array;
        break;
      break;
        this.marcas = [];
        this.marcas = this.dividirMarcas;
    }
  }

}
