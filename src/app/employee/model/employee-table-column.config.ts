import {ITableColumn} from "../../shared/models/table-column.model";

export const EMPLOYEE_TABLE_COLUMNS: ITableColumn[] = [
  {name: '#', dataKey: 'id', isSortable: true},
  {name: 'Firstname', dataKey: 'firstName', isSortable: true},
  {name: 'Middle Name', dataKey: 'middleName', isSortable: true},
  {name: 'Lastname', dataKey: 'lastName', isSortable: true},
  {name: 'Gender', dataKey: 'gender', isSortable: true},
  {name: 'Birth Date', dataKey: 'dateOfBirth', isSortable: false},
  {name: 'Age', dataKey: 'age', isSortable: false},
  {name: 'Email', dataKey: 'email', isSortable: true},
  {name: 'Phone number', dataKey: 'mobile', isSortable: true},
  {name: 'Work ID', dataKey: 'workId', isSortable: true},
  {name: 'Hire Date', dataKey: 'hireDate', isSortable: true},
  {name: 'Job Status', dataKey: 'status', isSortable: true},
  {name: 'YoE', dataKey: 'timeOfService', isSortable: false},
  {name: 'Department', dataKey: 'department.departmentName', isSortable: true},
  {name: 'Street', dataKey: 'address.street', isSortable: false},
  {name: 'Ward', dataKey: 'address.ward', isSortable: false},
  {name: 'District', dataKey: 'address.district', isSortable: false},
];

