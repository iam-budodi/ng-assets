/**
 * Electronic Asset Management APIs
 * We manage and organize inventory of all purchased electronic assets
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: luluyshaban@gmail.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { AllocationStatus } from './allocationStatus';
import { Employee } from './employee';
import { Asset } from './asset';


/**
 * Allocation representation
 */
export interface Allocation { 
    id?: number;
    allocationDate?: string;
    deallocationDate?: string;
    allocationRemark?: string;
    status?: AllocationStatus;
    employee: Employee;
    asset: Asset;
    allocatedBy?: string;
    updatedBy?: string;
}
export namespace Allocation {
}


