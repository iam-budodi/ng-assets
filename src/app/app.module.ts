import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule} from '@angular/router';
import {NgChartsModule} from 'ng2-charts';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NavbarComponent} from './navbar/navbar.component';
import {appRoutes} from './routes';
import {DashboardComponent} from './dashboard/dashboard.component';
import {StoreSessionsChartComponent} from './dashboard/charts/store-sessions-chart/store-sessions-chart.component';
import {AnnualSalesChartComponent} from './dashboard/charts/annual-sales-chart/annual-sales-chart.component';
import {SalesTrafficChartComponent} from './dashboard/charts/sales-traffic-chart/sales-traffic-chart.component';
import {ProductSalesChartComponent} from './dashboard/charts/product-sales-chart/product-sales-chart.component';
import {TicketComponent} from './common/ticket/ticket.component';
import {FormModule} from './form/form.module';
import {EmployeeModule} from './employee/employee.module';
import {AssetModule} from './asset/asset.module';
import {ProcureModule} from './procure/procure.module';
import {ApiModule} from "./service";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import { CoreModule } from './core/core.module';

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
    HttpClientModule,
    EmployeeModule,
    NgChartsModule,
    FormModule,
    AssetModule,
    ProcureModule,
    ApiModule,
    CoreModule,
    SharedModule,
    RouterModule.forRoot(appRoutes),
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {
}
