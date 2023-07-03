import {ITableColumn} from "../../../shared/models/table-column.model";

export const ASSIGNMENT_TABLE_COLUMNS: ITableColumn[] = [
  {name: '#', dataKey: 'id', isSortable: true},
  {name: 'Asset Brand', dataKey: 'asset.brand', isSortable: true},
  {name: 'Asset Model', dataKey: 'asset.model', isSortable: true},
  {name: 'Asset S/N', dataKey: 'asset.serialNumber', isSortable: true},
  {name: 'Employee Firstname', dataKey: 'employee.firstName', isSortable: true},
  {name: 'Employee Lastname', dataKey: 'employee.lastName', isSortable: true},
  {name: 'Work ID', dataKey: 'employee.workId', isSortable: true},
  {name: 'Email', dataKey: 'employee.email', isSortable: true},
  {name: 'Phone Number', dataKey: 'employee.mobile', isSortable: true},
  {name: 'Department', dataKey: 'employee.department.departmentName', isSortable: true},
  {name: 'Date Assigned', dataKey: 'allocationDate', isSortable: true},
  {name: 'Status', dataKey: 'status', isSortable: true},
  {name: 'Remarks', dataKey: 'allocationRemark', isSortable: true}
];
