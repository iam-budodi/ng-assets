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
import { Address } from './address';
import { LocalDate } from './localDate';
import { SupplierType } from './supplierType';

/**
 * Supplier representation
 */
export interface Supplier {
    id?: number;
    registeredAt?: LocalDate;
    updatedAt?: LocalDate;
    registeredBy: string;
    updatedBy?: string;
    name: string;
    email: string;
    phone: string;
    website?: string;
    supplierType: SupplierType;
    description: string;
    address: Address;
}
