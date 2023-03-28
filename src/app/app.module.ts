import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { appRoutes } from './routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StoreSessionsChartComponent } from './dashboard/charts/store-sessions-chart/store-sessions-chart.component';
import { AnnualSalesChartComponent } from './dashboard/charts/annual-sales-chart/annual-sales-chart.component';
import { SalesTrafficChartComponent } from './dashboard/charts/sales-traffic-chart/sales-traffic-chart.component';
import { ProductSalesChartComponent } from './dashboard/charts/product-sales-chart/product-sales-chart.component';
import { TicketComponent } from './common/ticket/ticket.component';
import { FormModule } from './form/form.module';
import { EmployeeModule } from './employee/employee.module';
import { AssetModule } from './asset/asset.module';
import { ProcureModule } from './procure/procure.module';
import {EmployeeService} from "./employee/employee.service";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    StoreSessionsChartComponent,
    AnnualSalesChartComponent,
    SalesTrafficChartComponent,
    ProductSalesChartComponent,
    TicketComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    EmployeeModule,
    NgChartsModule,
    FormModule,
    RouterModule.forRoot(appRoutes),
    AssetModule,
    ProcureModule,
  ],

  providers: [EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
