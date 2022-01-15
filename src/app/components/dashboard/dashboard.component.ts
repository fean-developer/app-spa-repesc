import { CustomersService } from './../../services/customers.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  labels: '';
};
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  
  public chartOptions: Partial<ChartOptions> | any;
  public chartTotalCustomers: Partial<ChartOptions> | any;
  public chartSharedOptions: Partial<ChartOptions> | any;
  


  constructor(customer: CustomersService) {
    
   }

  ngOnInit(): void {
    this.chartOptions = this.generateChartCircle({
      series: 20,
      height: 250,
      type: 'radialBar',
      plotOption: {
        size: '50%'
      },
      color: ['#0e6317'],
      labels: 'Total Clientes'
    });

    this.chartSharedOptions = this.generateChartCircle({
      series: 50,
      height: 250,
      type: 'radialBar',
      plotOption: {
        size: '50%'
      },
      color: ["#fc0303"],
      labels: 'Compartilhados'
    })
  
  }

  goToRespecsTranslate() {

  }

  generateChartCircle(data: any) {
    return {
      chart: {
        height: 280,
        type: "radialBar",
      },

      series: [data.series],
      colors: data.colors,
      plotOptions: {
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
            background: "#293450"
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15
            }
          },
          dataLabels: {
            name: {
              offsetY: -10,
              color: "#fff",
              fontSize: "13px"
            },
            value: {
              color: "#fff",
              fontSize: "30px",
              show: true
            }
          }
        }
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          gradientToColors: data.color,
          stops: [0, 100]
        }
      },
      stroke: {
        lineCap: "round"
      },
      labels: [data.labels],
    };
  }
}
