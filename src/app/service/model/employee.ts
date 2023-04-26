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
import { Department } from './department';
import { EmploymentStatus } from './employmentStatus';
import { Gender } from './gender';
import { LocalDate } from './localDate';

/**
 * Employee representation
 */
export interface Employee { 
    id?: number;
    registeredAt?: LocalDate;
    updatedAt?: LocalDate;
    registeredBy?: string;
    updatedBy?: string;
    firstName: string;
    middleName?: string;
    lastName: string;
    gender?: Gender;
    mobile: string;
    email: string;
    workId: string;
    dateOfBirth: LocalDate;
    hireDate: LocalDate;
    status: Array<EmploymentStatus>;
    department?: Department;
    address?: Address;
    age?: number;
    timeOfService?: number;
    retireAt?: LocalDate;
}