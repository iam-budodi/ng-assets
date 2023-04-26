import {ITableColumn} from "../../../shared/models/table-column.model";

export const SUPPLIER_TABLE_COLUMNS: ITableColumn[] = [
  {name: '#', dataKey: 'id', isSortable: true},
  {name: 'Company Name', dataKey: 'name', isSortable: true},
  {name: 'Company Email', dataKey: 'email', isSortable: true},
  {name: 'Company Phone', dataKey: 'phone', isSortable: true},
  {name: 'Supplier Type', dataKey: 'supplierType', isSortable: true},
  {name: 'Website', dataKey: 'website', isSortable: false},
  {name: 'Description', dataKey: 'description', isSortable: false},
  {name: 'Street', dataKey: 'address.street', isSortable: false},
  // {name: 'Ward', dataKey: 'address.ward', isSortable: false},
  // {name: 'District', dataKey: 'address.district', isSortable: false},
  {name: 'City', dataKey: 'address.city', isSortable: false},
  {name: 'Country', dataKey: 'address.country', isSortable: false},
];
