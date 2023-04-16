import { Component, OnInit, ViewChild } from '@angular/core';
import { FormComponent } from 'src/app/form/container/form/form.component';
import { EmployeeService } from '../employee.service';
import { ITableColumn } from '../model/table-column.model';
import {Employee, LocalDate} from "../../service";
import {PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {EmployeeDialogComponent} from "../employee-dialog/employee-dialog.component";
import {DialogService} from "../../dialog/dialog.service";
import {EmployeeDialog} from "../model/employee-dialog.model";
import {Query} from "../../shared/query.model";

// fall back for search queries
// export interface EmployeeQuery {
//   search: string;
//   registration: LocalDate;
// }

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
  dialogValue: EmployeeDialog = { mode: 'create' };

  tableData: PaginationDataSource<Employee, Query<LocalDate>> = new PaginationDataSource<Employee, Query<LocalDate>>(
    (request: PageRequest<Employee>, query: Query<LocalDate>) => this.employeeService.page(request, query),
    {property: 'firstName', order: 'asc'},
    {search: undefined!, registration: undefined!}
  )

  constructor(
    // private dialog: MatDialog,
    private dialogService: DialogService,
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

  // getEmployees(): Employee[] {
  //   return this.employees;
  // }

  createEmployee() {
    this.openEmployeeDialog().afterClosed().subscribe(result => console.log(result));
    // this.getEmployees();
    console.log('THE END!!');

    // dialogRef.afterClosed().subscribe({
    //   next: (val) => {
    //     if (val) {
    //       this.getEmployees();
    //     }
    //   },
    // });
  }

  updateEmployee(employee: any): void {
    // const dialogRef = this.dialog.open(CreateUpdateComponent, {
    //   data: employee,
    // });
    // dialogRef.afterClosed().subscribe({
    //   next: (val) => {
    //     if (val) {
    //       console.log('SUBSCRIBING!!!!!!!!!!!!!');
    //
    //       this.getEmployees();
    //     }
    //   },
    // });
  }

  deleteEmployee(employeeEvt: any): void {
    // uncomment for http
    // this.employees = this.employeeService.deleteEmployee(employeeEvt);
    this.employees = this.employees.filter(
      (employee) => employee.id !== employeeEvt.id
    );
  }

  openEmployeeDialog() {
    return this.dialogService.open(EmployeeDialogComponent, this.dialogValue);
  }

}
