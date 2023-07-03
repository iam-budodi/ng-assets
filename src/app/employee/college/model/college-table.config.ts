import {ITableColumn} from "../../../shared/models/table-column.model";

export const COLLEGE_TABLE_COLUMNS: ITableColumn[] = [
  {name: '#', dataKey: 'id', isSortable: true},
  {name: 'College Name', dataKey: 'collegeName', isSortable: true},
  {name: 'College Code', dataKey: 'collegeCode', isSortable: false},
  {name: 'Street', dataKey: 'location.street', isSortable: true},
  {name: 'Ward', dataKey: 'location.ward', isSortable: true},
  {name: 'District', dataKey: 'location.district', isSortable: true},
  {name: 'Postal Code', dataKey: 'location.postalCode', isSortable: true},
  {name: 'City', dataKey: 'location.city', isSortable: true},
  {name: 'Country', dataKey: 'location.country', isSortable: true},
];
