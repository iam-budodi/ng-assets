import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ITableColumn } from '../common/model/table-column.model';
import { IEmployee } from '../common/model/employee.model';
import { BreakpointObserver } from '@angular/cdk/layout';
import { cardLayout } from '../shared/card.layout';
import { Sort } from '@angular/material/sort';
import { IDialog } from '../common/dialog/dialog.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../common/dialog/dialog.component';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from './employee.service';
import { EmployeeDialogComponent } from './employee-dialog/employee-dialog.component';
import { FormComponent } from '../form/container/form/form.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
})
export class EmployeeComponent implements OnInit {
  @ViewChild(FormComponent) form!: FormComponent;
  updateForm!: FormGroup;
  employees!: IEmployee[];
  employeeTableColumns!: ITableColumn[];
  dialogMessage!: string;

  cardLayout = cardLayout(this.breakpointObserver);

  constructor(
    private breakpointObserver: BreakpointObserver,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.employees = this.route.snapshot.data['employees'];
    this.initColumns();
  }

  initColumns(): void {
    this.employeeTableColumns = this.employeeService.getTableColumns();
  }

  getEmployees(): IEmployee[] {
    return this.employees;
  }

  deleteEmployee(employeeEvt: IEmployee): void {
    // uncomment fo http
    // this.employees = this.employeeService.deleteEmployee(employeeEvt);
    this.employees = this.employees.filter(
      (employee) => employee.id !== employeeEvt.id
    );
  }

  updateEmployee(employeeFormValueEvt: IEmployee): void {

    console.log(this.form.valid);

    this.openDialog();
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
    const dialogParams: IDialog = {
      dialogHeader: 'Create Employees',
      dialogContent: '{{ Next add Form for employee creation }}',
      cancelButtonLabel: 'Cancel',
      confirmButtonLabel: 'Submits',
      callbackMethod: () => {
        console.log('dialog');
      },
    };

    this.dialog.open(EmployeeDialogComponent, {
      // width: '700px',
      panelClass: 'dynamic-dialog',
      data: dialogParams,
    });
  }
}
