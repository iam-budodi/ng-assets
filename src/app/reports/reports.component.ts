import {Component} from '@angular/core';
import {ExportService} from "./export.service";
import {ExcelJson} from "./model/excel-json.model";
import {Page, PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {Employee, EmployeeEndpointService} from "../service";
import {EmployeeService} from "../employee/employee.service";
import {ITableColumn} from "../shared/models/table-column.model";
import {EMPLOYEE_TABLE_COLUMNS} from "../employee/model/employee-table-column.config";
import {Query} from "../shared/models/query.model";
import {HttpResponse} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {resetForm} from "../shared/util/utils";
import {ReportFormService} from "../shared/util/report-form.service";
import {AUDIT_TABLE_COLUMNS} from "../shared/util/audit-table";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  form: FormGroup = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = this.formlyService.getReportFormFields();
  employeeTableColumns!: ITableColumn[];
  tableData!: PaginationDataSource<Employee, Query<Date>>;
  pageSizes: number[] = [5, 10, 15, 20, 50];
  defaultSize: number = this.pageSizes[0];
  employees!: Employee[];
  submitLabel: string = 'Load data';
  title: string = 'Generate Reports';


  constructor(
    private exportService: ExportService,
    private employeeService: EmployeeService,
    private employeeEndpointService: EmployeeEndpointService,
    private formlyService: ReportFormService
  ) {
  }

  ngOnInit(): void {
    this.employeeTableColumns = EMPLOYEE_TABLE_COLUMNS;

    // this.tableData.page$.subscribe({
    //   next: (page: Page<Employee>): void => {
    //     this.employees = page.content;
    //   }
    // });
  }

  onSubmit({value}: any): void {
    const {reportType, startDate, endDate} = value;
    console.log('TYPE: ' + reportType + ' START: ' + startDate + ' END: ' + endDate)
    this.employeeReport(startDate, endDate);
    resetForm(this.options);
  }

  exportToExcel(): void {
    const excelData: Array<ExcelJson> = [];
    const [sn, firstName, middleName, lastName, gender, dateOfBirth, age, email, mobile, workId, hireDate, status, timeOfService, departmentName, addressStreet, addressWard, addressDistrict] = EMPLOYEE_TABLE_COLUMNS.map(column => column.name);
    const [reqisteredBy, registeredAt, updatedBy, updatedAt] = AUDIT_TABLE_COLUMNS.map(column => column.name);
    const udt: ExcelJson = {
      data: [
        // {A: 'User Data'}, // title
        {
          A: sn,
          B: firstName,
          C: middleName,
          D: lastName,
          E: gender,
          F: dateOfBirth,
          G: age,
          H: email,
          I: mobile,
          J: workId,
          K: hireDate,
          L: status,
          M: timeOfService,
          N: departmentName,
          O: addressStreet,
          P: addressWard,
          Q: addressDistrict,
          R: reqisteredBy,
          S: registeredAt,
          T: updatedBy,
          U: updatedAt
        }, // table header
      ],
      skipHeader: true
    };
    this.employees.forEach((employee: Employee): void => {
      udt.data.push({
        A: employee.id,
        B: employee.firstName,
        C: employee.middleName,
        D: employee.lastName,
        E: employee.gender,
        F: employee.dateOfBirth,
        G: employee.age,
        H: employee.email,
        I: employee.mobile,
        J: employee.workId,
        K: employee.hireDate,
        L: employee.status,
        M: employee.timeOfService,
        N: employee.department?.name,
        O: employee.address?.street,
        P: employee.address?.ward,
        Q: employee.address?.district,
        R: employee.registeredBy,
        S: employee.registeredAt,
        T: employee.updatedBy,
        U: employee.updatedAt
      });
    });
    excelData.push(udt);


    this.exportService.exportJsonToExcel(excelData, 'Employees Report');
  }

  paginatedDataSource = () => {
    return new PaginationDataSource<Employee, Query<Date>>(
      (request: PageRequest<Employee>, query: Query<Date>) => this.employeeService.getEmployees(request, query),
      {property: 'firstName', order: 'asc'},
      {startDate: undefined!, endDate: undefined!}
    )
  }

  employeeReport(startDate: string, endDate: string) {
    return this.employeeEndpointService.restEmployeesReportGet(endDate, startDate, 'response').subscribe({
        next: (response: HttpResponse<Array<Employee>>): void => {
          if (response.status === 200) {
            this.tableData = this.paginatedDataSource();
            this.employees = response.body!;
          } else if (response.status === 204) {
            console.log('DIALOG PROMPT FOR NO DATA')
          }
        }
      }
    );
  }

}
