import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

// Servicios
import { ProductosService } from 'src/app/servicios/servicios.index';

// JQuery
declare var $: any;

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
  tipo: any;
  virtual: boolean = false;
  urlMendoza: any = 'https://cdn.flipsnack.com/widget/v2/widget.html?hash=fdplofipr&t=1577150828';

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
        this.tipo = this.router.snapshot.paramMap.get('menu');
        this.obtenerMarcas();
      }
    });
  }

  ngOnInit() {
    $(function() {
      // single book
      $('#mybook').booklet({
        width:  '87%',
        height: 655,
        pagePadding: 0,
      });
  });
  }

  irPorMarcas(marca: any) {
    this.route.navigate(['/pormarcas', marca.marca, marca.img, this.marca, this.tipo]);
  }

  obtenerMarcas() {
    this.marcas = [];
    if (this.tipo === 'GENERICO') {
      this._productoService.obtenerMarcasFMO().subscribe((fmo: any) => {
        if (fmo.status) {
          this.marcas = fmo.respuesta;
          this.dividirMarcas = fmo.respuesta;
          const array = [];
          for (const mc of this.marcas) {
            if (mc.marca === 'Generico') {
              array.push(mc);
            }
          }
          this.marcas = array;
          this.virtual = false;
        }
      });
      this.elegirMenu(3);
    } else {
      if (this.marca === 'Truper') {
        this._productoService.obtenerMarcasTruper().subscribe((truper: any) => {
          if (truper.status) {
            this.marcas = truper.respuesta;
            this.dividirMarcas = truper.respuesta;
            this.virtual = false;
          }
        });
      } else if (this.marca === 'Fmo') {
          this._productoService.obtenerMarcasFMO().subscribe((fmo: any) => {
            if (fmo.status) {
              this.marcas = fmo.respuesta;
              this.dividirMarcas = fmo.respuesta;
              const array = [];
              for (const mc of this.marcas) {
                if (mc.marca !== 'Generico') {
                  this.tipo = 'MARCAS';
                  array.push(mc);
                } else {
                  this.tipo = 'GENERICO';
                }
              }
              this.marcas = array;
              this.virtual = false;
            }
          });
      } else if (this.marca === 'Virtual') {
        console.log('Mostrar el catálogo virtual');
        this.marcas = [];
        this.virtual = true;
      }
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
            this.tipo = 'MARCAS';
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
            this.tipo = 'GENERICO';
          }
        }
        this.marcas = array;
        break;
      default:
        this.marcas = [];
        this.marcas = this.dividirMarcas;
        for (const mc of this.marcas) {
          if (mc.marca !== 'Generico') {
            array.push(mc);
            this.tipo = 'MARCAS';
          }
        }
        this.marcas = array;
    }
  }

}
