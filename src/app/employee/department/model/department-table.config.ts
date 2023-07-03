import {ITableColumn} from "../../../shared/models/table-column.model";

export const DEPARTMENT_TABLE_COLUMNS: ITableColumn[] = [
  {name: '#', dataKey: 'id', isSortable: true},
  {name: 'College Name', dataKey: 'college.collegeName', isSortable: true},
  {name: 'Department Name', dataKey: 'departmentName', isSortable: true},
  {name: 'Department Code', dataKey: 'departmentCode', isSortable: false},
  {name: 'Description', dataKey: 'description', isSortable: false},
];
