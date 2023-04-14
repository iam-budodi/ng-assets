import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute } from '@angular/router';
import { FormComponent } from 'src/app/form/container/form/form.component';
import { CreateUpdateComponent } from '../create-update/create-update.component';
import { EmployeeService } from '../employee.service';
import { IEmployee } from '../model/employee.model';
import { ITableColumn } from '../model/table-column.model';
import {Employee, EmployeeEndpointService, LocalDate} from "../../service";
import {PageRequest, PaginationDataSource} from "ngx-pagination-data-source";

export interface EmployeeQuery {
  search: string;
  registration: LocalDate;
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  @ViewChild(FormComponent) form!: FormComponent;
  employeeTableColumns!: ITableColumn[];
  employees!: Employee[];
  pageSizes: number[] = [5, 10, 15, 20, 50];
  defaultSize: number = this.pageSizes[0];

  tableData: PaginationDataSource<Employee, EmployeeQuery> = new PaginationDataSource<Employee, EmployeeQuery>(
    (request: PageRequest<Employee>, query: EmployeeQuery) => this.employeeService.page(request, query),
    {property: 'firstName', order: 'desc'},
    {search: undefined!, registration: undefined!}
  )

  constructor(
    private dialog: MatDialog,
    private employeeService: EmployeeService,
  ) {}


  // WITH RESOLVER FUNCTION ALL THE COMMENTED OUT
  // ngOnInit(): void {
  //   this.initColumns();
  //   const { employees, totalCountHeader, linkHeader } = this.route.snapshot.data['employees'];
  //   this.employees = employees as Employee[];
  //   this.totalCount = totalCountHeader as number;
  //   this.tableData.data = this.employees;
  //   this.tableData.totalCounts = this.totalCount;
  //   this.links = linkHeader;
  //   console.log("EMPLOYEES : " + JSON.stringify(this.tableData.data));
  //   console.log("TOTAL : " + this.tableData.totalCounts);
  //   console.log("LINKS : " + this.links);
  // }

  ngOnInit(): void {
    this.employeeTableColumns = this.employeeService.getTableColumns();
  }

  getEmployees(): Employee[] {
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

}
