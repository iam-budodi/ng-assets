import { Component, OnInit } from '@angular/core';
import { ITableColumn } from '../common/Model/table-column.model';
import { IEmployee } from './employee.model';
import { BreakpointObserver } from '@angular/cdk/layout';
import { cardLayout } from '../shared/card.layout';
import { Sort } from '@angular/material/sort';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees!: IEmployee[];
  employeeTableColumns!: ITableColumn[];

  cardLayout = cardLayout(this.breakpointObserver);
  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit(): void {
    this.employees = this.getEmployees();
    this.initColumns();
  }

  sortData(sortParameters: Sort): IEmployee[] | undefined | void {
    const keyName = sortParameters.active as keyof IEmployee;
    if (sortParameters.direction === 'asc') {
      this.employees = this.employees.sort((a: IEmployee, b: IEmployee) =>
        (a[keyName] as string).localeCompare(b[keyName] as string)
      );
    } else if (sortParameters.direction === 'desc') {
      this.employees = this.employees.sort((a: IEmployee, b: IEmployee) =>
        (b[keyName] as string).localeCompare(a[keyName] as string)
      );
    } else {
      return (this.employees = this.getEmployees());
    }
  }

  getEmployees(): IEmployee[] {
    return [
      {
        id: 1,
        firstName: 'Lulu',
        lastName: 'Yahaya',
        workId: 'UDSM-2023-1002',
        address: 'Korogwe, Kimara',
        age: 26,
      },
      {
        id: 2,
        firstName: 'Habiba',
        lastName: 'Yahaya',
        workId: 'UDSM-2023-1001',
        address: 'Santika, Mwenge',
        age: 25,
      },
      {
        id: 3,
        firstName: 'Japhet',
        lastName: 'Sebastian',
        workId: 'UDSM-2023-1003',
        address: 'Kibo, Kimara',
        age: 30,
      },
      {
        id: 4,
        firstName: 'Lulu',
        lastName: 'Yahaya',
        workId: 'UDSM-2023-1002',
        address: 'Korogwe, Kimara',
        age: 26,
      },
      {
        id: 5,
        firstName: 'Habiba',
        lastName: 'Yahaya',
        workId: 'UDSM-2023-1001',
        address: 'Santika, Mwenge',
        age: 25,
      },
      {
        id: 6,
        firstName: 'Japhet',
        lastName: 'Sebastian',
        workId: 'UDSM-2023-1003',
        address: 'Kibo, Kimara',
        age: 30,
      },
    ];
  }

  removeEmployee(employeeEvt: IEmployee) {
    console.log("Emitted event on click " + employeeEvt);

    this.employees = this.employees.filter(
      (employee) => employee.id !== employeeEvt.id
    );
  }

  initColumns(): void {
    this.employeeTableColumns = [
      { name: ' ', dataKey: 'id', isSortable: true },
      { name: 'First Name', dataKey: 'firstName', isSortable: true },
      { name: 'Last Name', dataKey: 'lastName', isSortable: true },
      { name: 'Work ID', dataKey: 'workId', isSortable: true },
      { name: 'Address', dataKey: 'address', isSortable: false },
      { name: 'Age', dataKey: 'age', isSortable: false },
    ];
  }
}
