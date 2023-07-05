import {Component, OnInit} from '@angular/core';
import {Page, PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {Employee} from "../../service";
import {Query} from "../../shared/models/query.model";
import {ExcelJson} from "../model/excel-json.model";
import {employeeExcelHeader} from "../utils/headers.report";
import {employeeExcelData} from "../utils/values.report";
import {EMPLOYEE_TABLE_COLUMNS} from "../../employee/model/employee-table-column.config";
import {ExportService} from "../export.service";
import {EmployeeService} from "../../employee/employee.service";
import {ITableColumn} from "../../shared/models/table-column.model";

@Component({
  selector: 'app-employees-report',
  templateUrl: './employees-report.component.html',
  styleUrls: ['./employees-report.component.css']
})
export class EmployeesReportComponent implements OnInit {
  tableColumns!: ITableColumn[];
  tableData!: PaginationDataSource<Employee, Query<Date>>;
  pageSizes: number[] = [5, 10, 15, 20, 50];
  defaultSize: number = this.pageSizes[0];
  reportTitle: string = 'Employees Report';
  udt!: ExcelJson;
  employees!: Employee[];
  title: string = 'Specify Date Range to Export Report';

  constructor(
    private exportService: ExportService,
    private employeeService: EmployeeService,
  ) {
  }

  ngOnInit(): void {
    this.employeeReport();
  }

  exportToExcel(): void {
    this.udt = this.employeeExcelJson();
    this.exportService.exportJsonToExcel(this.excelSheet(this.udt), this.reportTitle);
  }

  employeeReport(): void {
    this.tableColumns = EMPLOYEE_TABLE_COLUMNS;
    this.tableData = this.employeeDataSource();
    this.tableData.page$.subscribe({
      next: (page: Page<Employee>): void => {
        this.employees = page.content;
        // console.log('EMP 1: ' + JSON.stringify(this.employees))
      }
    });
  }

  excelSheet(udt: ExcelJson): Array<ExcelJson> {
    const excelData: Array<ExcelJson> = [];
    excelData.push(udt);
    return excelData;

  }

  sheetHeader(sheetHeader: any): ExcelJson {
    return {
      data: [sheetHeader],
      skipHeader: true
    };
  }

  employeeExcelJson(): ExcelJson {
    const udt: ExcelJson = this.sheetHeader(employeeExcelHeader());
    employeeExcelData(this.employees, udt);
    return udt;
  }

  employeeDataSource = () => {
    return new PaginationDataSource<Employee, Query<Date>>(
      (request: PageRequest<Employee>, query: Query<Date>) => this.employeeService.dataForReports(request, query),
      {property: 'firstName', order: 'asc'},
      {startDate: undefined!, endDate: undefined!}
    )
  }

}
