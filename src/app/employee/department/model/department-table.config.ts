import {ITableColumn} from "../../../shared/models/table-column.model";

export const DEPARTMENT_TABLE_COLUMNS: ITableColumn[] = [
  {name: '#', dataKey: 'id', isSortable: true},
  {name: 'Name', dataKey: 'name', isSortable: true},
  {name: 'Code', dataKey: 'code', isSortable: false},
  {name: 'Street', dataKey: 'location.street', isSortable: true},
  {name: 'Ward', dataKey: 'location.ward', isSortable: true},
  {name: 'District', dataKey: 'location.district', isSortable: true},
  {name: 'PostalCode', dataKey: 'location.postalCode', isSortable: true},
  {name: 'City', dataKey: 'location.city', isSortable: true},
  {name: 'Country', dataKey: 'location.country', isSortable: true},
  {name: 'Description', dataKey: 'description', isSortable: false},
];
