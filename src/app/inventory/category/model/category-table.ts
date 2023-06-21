import {ITableColumn} from "../../../shared/models/table-column.model";

export const CATEGORY_TABLE_COLUMNS: ITableColumn[] = [
  {name: '#', dataKey: 'id', isSortable: true},
  {name: 'Name', dataKey: 'name', isSortable: true},
  {name: 'Description', dataKey: 'description', isSortable: false},
];
