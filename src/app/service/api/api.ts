export * from './categoryEndpoint.service';
import {CategoryEndpointService} from './categoryEndpoint.service';
import {ComputerEndpointService} from './computerEndpoint.service';
import {DepartmentEndpointService} from './departmentEndpoint.service';
import {EmployeeEndpointService} from './employeeEndpoint.service';
import {ItemResourceService} from './itemResource.service';
import {MicroProfileHealthService} from './microProfileHealth.service';
import {PurchaseEndpointService} from './purchaseEndpoint.service';
import {SupplierEndpointService} from './supplierEndpoint.service';

export * from './computerEndpoint.service';

export * from './departmentEndpoint.service';

export * from './employeeEndpoint.service';

export * from './itemResource.service';

export * from './microProfileHealth.service';

export * from './purchaseEndpoint.service';

export * from './supplierEndpoint.service';

export const APIS = [CategoryEndpointService, ComputerEndpointService, DepartmentEndpointService, EmployeeEndpointService, ItemResourceService, MicroProfileHealthService, PurchaseEndpointService, SupplierEndpointService];
