import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { NgChartsModule } from 'ng2-charts';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavbarComponent } from './navbar/navbar.component';
import { MaterialModule } from './material.module';
import { appRoutes } from './routes';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CardComponent } from './common/card/card.component';
import { StoreSessionsChartComponent } from './charts/store-sessions-chart/store-sessions-chart.component';
import { AnnualSalesChartComponent } from './charts/annual-sales-chart/annual-sales-chart.component';
import { SalesTrafficChartComponent } from './charts/sales-traffic-chart/sales-traffic-chart.component';
import { ProductSalesChartComponent } from './charts/product-sales-chart/product-sales-chart.component';
import { TicketComponent } from './common/ticket/ticket.component';
import { MiniCardComponent } from './mini-card/mini-card.component';
import { TableComponent } from './common/table/table.component';
import { DataPropertyGetterPipe } from './common/model/data-property-getter.pipe';
import { EmployeeComponent } from './employee/employee.component';
import { AddressComponent } from './common/address/address.component';
import { FormModule } from './form/form.module';
import { EmployeeService } from './employee/employee.service';
import { EmployeeDialogComponent } from './employee/employee-dialog/employee-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DashboardComponent,
    CardComponent,
    StoreSessionsChartComponent,
    AnnualSalesChartComponent,
    SalesTrafficChartComponent,
    ProductSalesChartComponent,
    TicketComponent,
    MiniCardComponent,
    TableComponent,
    DataPropertyGetterPipe,
    EmployeeComponent,
    AddressComponent,
    EmployeeDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgChartsModule,
    FormModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
})
export class AppModule {}
