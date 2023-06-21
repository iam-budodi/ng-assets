import {ITableColumn} from "../../../shared/models/table-column.model";

export const TRANSFER_TABLE_COLUMNS: ITableColumn[] = [
  {name: '#', dataKey: 'id', isSortable: true},
  {name: 'Asset Brand', dataKey: 'asset.brand', isSortable: true},
  {name: 'Asset Model', dataKey: 'asset.model', isSortable: true},
  {name: 'Asset S/N', dataKey: 'asset.serialNumber', isSortable: true},
  {name: 'Transferor Firstname', dataKey: 'employee.firstName', isSortable: true},
  {name: 'Transferor Lastname', dataKey: 'employee.lastName', isSortable: true},
  {name: 'Transferee Firstname', dataKey: 'newEmployee.firstName', isSortable: true},
  {name: 'Transferee Lastname', dataKey: 'newEmployee.lastName', isSortable: true},
  {name: 'Transferee Work-ID', dataKey: 'newEmployee.workId', isSortable: true},
  {name: 'Transferee Email', dataKey: 'newEmployee.email', isSortable: true},
  {name: 'Transferee mobile', dataKey: 'employee.mobile', isSortable: true},
  {name: 'Transferee Department', dataKey: 'employee.department.name', isSortable: true},
  {name: 'Date Transferred', dataKey: 'transferDate', isSortable: true},
  {name: 'Status', dataKey: 'status', isSortable: true},
  {name: 'Remarks', dataKey: 'transferRemark', isSortable: true}
];
