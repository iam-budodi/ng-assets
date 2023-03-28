import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { FormComponent } from 'src/app/form/container/form/form.component';
import { CreateUpdateComponent } from '../create-update/create-update.component';
import { EmployeeService } from '../employee.service';
import { IEmployee } from '../model/employee.model';
import { ITableColumn } from '../model/table-column.model';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(FormComponent) form!: FormComponent;
  employees!: IEmployee[];
  employeeTableColumns!: ITableColumn[];

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initColumns();
    this.employees = this.route.snapshot.data['employees'];
  }

  initColumns(): void {
    this.employeeTableColumns = this.employeeService.getTableColumns();
  }

  getEmployees(): IEmployee[] {
    return this.employees;
  }

  createEmployee() {
    const initEmployee: IEmployee = {
      firstName: '',
      lastName: '',
      workId: '',
      address: '',
      age: 0
    };
    const dialogRef = this.dialog.open(CreateUpdateComponent, {
      // width: '700px',
      // // minHeight: '900px',
      // panelClass: 'dynamic-dialog',
      data: initEmployee,
    });
    this.getEmployees();
    console.log('THE END!!');

    // dialogRef.afterClosed().subscribe({
    //   next: (val) => {
    //     if (val) {
    //       this.getEmployees();
    //     }
    //   },
    // });
  }

  updateEmployee(employee: IEmployee): void {
    const dialogRef = this.dialog.open(CreateUpdateComponent, {
      data: employee,
    });
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          console.log('SUBSCRIBING!!!!!!!!!!!!!');

          this.getEmployees();
        }
      },
    });
  }

  deleteEmployee(employeeEvt: IEmployee): void {
    // uncomment for http
    // this.employees = this.employeeService.deleteEmployee(employeeEvt);
    this.employees = this.employees.filter(
      (employee) => employee.id !== employeeEvt.id
    );
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
}
