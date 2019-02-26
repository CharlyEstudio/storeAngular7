import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grafica-lineal',
  templateUrl: './grafica-lineal.component.html',
  styles: []
})
export class GraficaLinealComponent implements OnInit {

  @Input() lineChartColors: any [] = [];
  @Input() lineChartLabels: any [] = [];
  @Input() lineChartOptions: any [] = [];
  @Input() lineChartData: any[] = [];

  public lineChartLegend: boolean = true;
  public lineChartType: string = 'line';
  public options = {
    yAxes: [
      {
        ticks: {
            min: 0,
            max: 2,
            stepSize: 1
        }
      }
    ]
  };

  constructor() { }

  ngOnInit() {
  }

}
