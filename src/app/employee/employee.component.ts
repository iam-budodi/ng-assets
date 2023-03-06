import { Component, OnInit } from '@angular/core';
import { ITableColumn } from '../common/Model/table-column.model';
import { IEmployee } from './employee.model';
import { BreakpointObserver } from '@angular/cdk/layout';
import { cardLayout } from '../shared/card.layout';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees: IEmployee[] = [];
  employeeTableColumns: ITableColumn[] = [];

  cardLayout = cardLayout(this.breakpointObserver);
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.employees = this.getEmployees();
    this.initColumns();
  }

  getEmployees(): IEmployee[] {
    return [
      {
        firstName: 'Lulu',
        lastName: 'Yahaya',
        workId: 'UDSM-2023-1002',
        age: 26,
      },
      {
        firstName: 'Habiba',
        lastName: 'Yahaya',
        workId: 'UDSM-2023-1001',
        age: 25,
      },
      {
        firstName: 'Japhet',
        lastName: 'Sebastian',
        workId: 'UDSM-2023-1003',
        age: 30,
      },
    ];
  }

  initColumns(): void {
    this.employeeTableColumns = [
      { name: 'First Name', dataKey: 'firstName' },
      { name: 'Last Name', dataKey: 'lastName' },
      { name: 'Work ID', dataKey: 'workId' },
      { name: 'Age', dataKey: 'age' },
    ];
  }
}
