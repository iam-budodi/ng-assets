import { Component, OnInit, Input } from "@angular/core";
import {formatDate, registerLocaleData} from "@angular/common"
import localeEn from '@angular/common/locales/en';
import {ComputerEndpointService, EmployeeAsset, PurchaseChart, PurchaseEndpointService} from "../../../service";
import {HttpResponse} from "@angular/common/http";

registerLocaleData(localeEn);

@Component({
  selector: "app-bar-chart",
  templateUrl: "./bar-chart.component.html",
  styleUrls: ["./bar-chart.component.scss"]
})

export class BarChartComponent implements OnInit {
  @Input() query: Object;

  purchaseRecord!: PurchaseChart[];
  constructor(private purchaseService: PurchaseEndpointService){}

  public barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    legend: { display: false },
    cornerRadius: 50,
    tooltips: {
      enabled: true,
      mode: 'index',
      intersect: false,
      borderWidth: 1,
      borderColor: "#eeeeee",
      backgroundColor: "#ffffff",
      titleFontColor: "#43436B",
      bodyFontColor: "#A1A1B5",
      footerFontColor: "#A1A1B5",
    },
    layout: { padding: 0 },
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: "#A1A1B5",
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        },
      ],
      yAxes: [
        {
          ticks: {
            fontColor: "#A1A1B5",
            beginAtZero: true,
            min: 0,
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: "#eeeeee",
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: "#eeeeee",
          },
        },
      ],
    },
  };

  public barChartLabels = [];
  public barChartType = "bar";
  public barChartLegend = true;
  public barChartData = [];

  ngOnInit() {
    this.purchaseService.restPurchasesDashboardGet('response').subscribe({
      next: (response: HttpResponse<Array<PurchaseChart>>): void => {
        if (response.status === 200) {
          this.purchaseRecord = response.body!;
          const COLORS_SERIES = ['#FF6492', '#F3F3FB', '#FFA2BE'];
          this.barChartLabels = this.purchaseRecord.map((pc) => formatDate(pc.purchaseDate, 'longDate', 'en'));
          this.barChartData = this.purchaseRecord.map((q) => ({
            // label: s.title,
            data: q.quantity,
            backgroundColor: COLORS_SERIES[0],
            fill: false,
          }));
        }
      }
    }
      // resultSet => {
      //   const COLORS_SERIES = ['#FF6492', '#F3F3FB', '#FFA2BE'];
      //   this.barChartLabels = formatDate(c.category, 'longDate', 'en');
      //   this.barChartData = resultSet.series().map((s, index) => ({
      //     label: s.title,
      //     data: s.series.map((r) => r.value),
      //     backgroundColor: COLORS_SERIES[index],
      //     fill: false,
      //   }));
      // },
      // err => console.log('HTTP Error', err)
    );
  }
}
