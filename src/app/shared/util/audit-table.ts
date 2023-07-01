import {ITableColumn} from "../models/table-column.model";

export const AUDIT_TABLE_COLUMNS: ITableColumn[] = [
  {name: 'Registered By', dataKey: 'registeredBy', isSortable: false},
  {name: 'Registered At', dataKey: 'registeredAt', isSortable: false},
  {name: 'Updated By', dataKey: 'updatedBy', isSortable: false},
  {name: 'Updated at', dataKey: 'updatedAt', isSortable: false},
]
