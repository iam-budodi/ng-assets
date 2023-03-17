import { AfterViewInit, ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ITableColumn } from '../common/model/table-column.model';
import { IEmployee } from '../common/model/employee.model';
import { BreakpointObserver } from '@angular/cdk/layout';
import { cardLayout } from '../shared/card.layout';
import { Sort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { IDialog } from '../common/model/dialog.model';
import { FormComponent } from '../form/container/form/form.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  employees!: IEmployee[];
  employeeTableColumns!: ITableColumn[];
  dialogMessage!: string;

  @ViewChild(FormComponent) form!: FormComponent;

  cardLayout = cardLayout(this.breakpointObserver);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.employees = this.route.snapshot.data['employees'];
    //this.getEmployee(this.route.snapshot.params['id']); // for update funct
    this.initColumns();
  }

  initColumns(): void {
    this.employeeTableColumns = this.employeeService.getTableColumns();
  }

  getEmployees(): IEmployee[] {
    return this.employees;
  }
  // for update : IEmployee | undefined
  getEmployee(value: IEmployee) {
    console.log('ID VALUE: ' + value);
    // this.form.setValue('address', value.address)
    console.log('TRG : ' + JSON.stringify(value));
    // this.employee = this.employeeService.findEmployee(value)!;
    // console.log('ID : ' + this.employee);
    // return this.employee;
  }

  deleteEmployee(employeeEvt: IEmployee): void {
    // uncomment fo http
    // this.employees = this.employeeService.deleteEmployee(employeeEvt);
    this.employees = this.employees.filter(
      (employee) => employee.id !== employeeEvt.id
    );
  }

  updateEmployee(employeeFormValueEvt: IEmployee): void {
    const dialogRef = this.dialog.open(EmployeeDialogComponent, { data: employeeFormValueEvt });
     dialogRef.afterClosed().subscribe({
       next: (val) => {
         if (val) {
           this.getEmployees();
         }
       },
     });

    // this.openDialog();
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

  openDialog(): void {
    const create: IDialog = {
      dialogHeader: 'Create Employee',
      dialogContent: '{{ Next add Form for employee creation }}',
      cancelButtonLabel: 'Cancel',
      confirmButtonLabel: 'Submits',
      callbackMethod: () => {
        console.log('dialog');
      },
    };

    this.dialog.open(EmployeeDialogComponent, {
      // width: '700px',
      minHeight: '700px',
      panelClass: 'dynamic-dialog',
      data: create,
    });

  }


}
