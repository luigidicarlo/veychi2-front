import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label, SingleDataSet, MultiDataSet } from 'ng2-charts';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  constructor() { }

  //GRÁFICO DE LÍNEAS

  lineChartData: ChartDataSets[] = [
    { data: [85, 72, 78, 75, 77, 75], label: 'Ventas del primer semestre' },
  ];

  lineChartLabels: Label[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  //GRÁFICO DE BARRAS

  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: Label[] = ['Zapatos', 'Camisas', 'Alfombras', 'Libros', 'Naranjas', 'Uvas'];
  barChartType = 'bar';
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
    { data: [45, 37, 60, 70, 46, 33], label: 'Ventas de productos de la tienda' }
  ];

  //GRÁFICO DE DONA

  doughnutChartLabels: Label[] = ['Zapatos', 'Comida', 'Otros'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType = 'doughnut';

  //GRÁFICO DE TORTA

  public pieChartOptions: ChartOptions = {
    responsive: true,
  };
  public pieChartLabels: Label[] = ['SciFi', 'Drama', 'Comedia'];
  public pieChartData: SingleDataSet = [30, 50, 20];
  public pieChartType = 'pie';
  public pieChartLegend = true;
  public pieChartPlugins = [];

  ngOnInit() {
  }



}
