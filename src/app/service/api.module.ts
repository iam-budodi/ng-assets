import {ModuleWithProviders, NgModule, Optional, SkipSelf} from '@angular/core';
import {Configuration} from './configuration';
import {HttpClient} from '@angular/common/http';


import {CategoryEndpointService} from './api/categoryEndpoint.service';
import {ComputerEndpointService} from './api/computerEndpoint.service';
import {DepartmentEndpointService} from './api/departmentEndpoint.service';
import {EmployeeEndpointService} from './api/employeeEndpoint.service';
import {ItemResourceService} from './api/itemResource.service';
import {MicroProfileHealthService} from './api/microProfileHealth.service';
import {PurchaseEndpointService} from './api/purchaseEndpoint.service';
import {SupplierEndpointService} from './api/supplierEndpoint.service';

@NgModule({
  imports: [],
  declarations: [],
  exports: [],
  providers: [
    CategoryEndpointService,
    ComputerEndpointService,
    DepartmentEndpointService,
    EmployeeEndpointService,
    ItemResourceService,
    MicroProfileHealthService,
    PurchaseEndpointService,
    SupplierEndpointService]
})
export class ApiModule {
  constructor(@Optional() @SkipSelf() parentModule: ApiModule,
              @Optional() http: HttpClient) {
    if (parentModule) {
      throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
    }
    if (!http) {
      throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
        'See also https://github.com/angular/angular/issues/20575');
    }
  }

  public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
    return {
      ngModule: ApiModule,
      providers: [{provide: Configuration, useFactory: configurationFactory}]
    };
  }
}
