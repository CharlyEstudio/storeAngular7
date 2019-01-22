import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafica-barras',
  templateUrl: './grafica-barras.component.html',
  styles: []
})
export class GraficaBarrasComponent implements OnInit {

  // Barras
  @Input() barChartLabels: any [] = [];
  @Input() barChartData: any[] = [];
  @Input() barChartType: any [] = [];
  @Input() barChartLegend: any [] = [];
  @Input() barChartOptions: any [] = [];

  constructor() { }

  ngOnInit() {
  }

}
