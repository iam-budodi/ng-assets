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
import { College } from './college';
import { HeadOfDepartment } from './headOfDepartment';


/**
 * Department representation
 */
export interface Department { 
    id?: number;
    departmentName: string;
    departmentCode?: string;
    description?: string;
    college: College;
    headOfDepartment?: HeadOfDepartment;
}

