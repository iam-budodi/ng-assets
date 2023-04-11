/**
 * Electronic Asset Inventory API
 * We keep and organize inventory of all purchased electronic assets
 *
 * OpenAPI spec version: 1.0.0
 * Contact: luluyshaban@gmail.com
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { AllocationStatus } from './allocationStatus';
import { Asset } from './asset';
import { Employee } from './employee';
import { Instant } from './instant';

/**
 * Transfer representation
 */
export interface Transfer { 
    id?: number;
    transferDate?: Instant;
    transferRemark?: string;
    status?: Array<AllocationStatus>;
    fromEmployee?: Employee;
    toEmployee?: Employee;
    asset?: Asset;
}