import {APP_INITIALIZER, NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
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
import {EmployeeModule} from './employee/employee.module';
import {ApiModule} from "./service";
import {HttpClientModule} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {CoreModule} from './core/core.module';
import {AllocationModule} from "./allocation/allocation.module";
import {InventoryModule} from "./inventory/inventory.module";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {AuthGuard} from "./navbar/auth.guard";
import {NgOptimizedImage} from "@angular/common";
import {ReportsComponent} from './reports/reports.component';
import {ExportService} from "./reports/export.service";
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EmployeesReportComponent } from './reports/employees-report/employees-report.component';
import { AssetsReportComponent } from './reports/assets-report/assets-report.component';
import { AllocationsReportComponent } from './reports/allocations-report/allocations-report.component';
import { TransfersReportComponent } from './reports/transfers-report/transfers-report.component';

export function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'udsm-assets-management',
        clientId: 'assets-frontend'
      },
      initOptions: {
        onLoad: 'login-required',
        checkLoginIframe: true,
        silentCheckSsoRedirectUri: window.location.origin + '/assets/silent-check-sso.html',
      },
      bearerExcludedUrls: ['/assets']
    });
}

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
    ReportsComponent,
    EmployeesReportComponent,
    AssetsReportComponent,
    AllocationsReportComponent,
    TransfersReportComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    KeycloakAngularModule,
    EmployeeModule,
    NgChartsModule,
    ApiModule,
    CoreModule,
    SharedModule,
    InventoryModule,
    AllocationModule,
    RouterModule.forRoot(appRoutes),
    NgOptimizedImage,
    FormsModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
  ],

  providers: [{
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService],
  }, AuthGuard, ExportService],
  bootstrap: [AppComponent],
})
export class AppModule {
}
