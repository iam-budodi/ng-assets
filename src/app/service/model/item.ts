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
import {Category} from './category';
import {LocalDate} from './localDate';
import {Status} from './status';
import {Supplier} from './supplier';

export interface Item {
  id?: number;
  itemName: string;
  qtyBought: number;
  status?: Status;
  datePurchased: LocalDate;
  transferCount?: number;
  description?: string;
  category?: Category;
  supplier?: Supplier;
}