import {Component} from '@angular/core';
import {ExportService} from "./export.service";
import {ExcelJson} from "./model/excel-json.model";
import {Page, PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {
  Allocation,
  AllocationEndpointService,
  Computer,
  ComputerEndpointService,
  Employee,
  EmployeeEndpointService,
  Transfer,
  TransferEndpointService
} from "../service";
import {EmployeeService} from "../employee/employee.service";
import {ITableColumn} from "../shared/models/table-column.model";
import {EMPLOYEE_TABLE_COLUMNS} from "../employee/model/employee-table-column.config";
import {Query} from "../shared/models/query.model";
import {HttpResponse} from "@angular/common/http";
import {FormGroup} from "@angular/forms";
import {FormlyFieldConfig, FormlyFormOptions} from "@ngx-formly/core";
import {resetForm} from "../shared/util/utils";
import {ReportFormService} from "../shared/util/report-form.service";
import {
  allocationExcelHeader,
  computerExcelHeader,
  employeeExcelHeader,
  transferExcelHeader
} from "./utils/headers.report";
import {allocationExcelData, computerExcelData, employeeExcelData, transferExcelData} from "./utils/values.report";
import {ASSIGNMENT_TABLE_COLUMNS} from "../allocation/assign/model/assign-table.config";
import {COMPUTER_TABLE_COLUMNS} from "../inventory/computer/model/computer-table.config";
import {TRANSFER_TABLE_COLUMNS} from "../allocation/transfer/model/transfer-table";

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css']
})
export class ReportsComponent {
  form: FormGroup = new FormGroup({});
  options: FormlyFormOptions = {};
  fields: FormlyFieldConfig[] = this.formlyService.getReportFormFields();
  tableColumns!: ITableColumn[];
  tableData!: PaginationDataSource<any, Query<Date>>;
  pageSizes: number[] = [5, 10, 15, 20, 50];
  defaultSize: number = this.pageSizes[0];
  employees!: Employee[];
  computers!: Computer[];
  allocations!: Allocation[];
  transfers!: Transfer[];
  submitLabel: string = 'Load data';
  title: string = 'Generate Reports';
  reportType!: string;


  constructor(
    private exportService: ExportService,
    private employeeService: EmployeeService,
    // private employeeEndpointService: EmployeeEndpointService,
    private computerEndpointService: ComputerEndpointService,
    private allocationEndpointService: AllocationEndpointService,
    private transferEndpointService: TransferEndpointService,
    private formlyService: ReportFormService
  ) {
  }

  ngOnInit(): void {
    this.tableColumns = EMPLOYEE_TABLE_COLUMNS;
    this.tableData = this.employeeDataSource();

    this.tableData.page$.subscribe({
      next: (page: Page<Employee>): void => {
        this.employees = page.content;
        // console.log('EMP 1: ' + JSON.stringify(this.employees))
      }
    });

  }

  onSubmit({value}: any): void {
    const {reportType, startDate, endDate} = value;
    this.reportType = reportType;
    console.log('TYPE: ' + reportType + ' START: ' + startDate + ' END: ' + endDate)
    // this.employeeReport(startDate, endDate);
    this.switchReports(reportType, startDate, endDate)
    resetForm(this.options);
  }

  switchReports(reportType: string, startDate: string, endDate: string) {
    if (reportType === 'employee') {
      this.tableColumns = EMPLOYEE_TABLE_COLUMNS;
      // this.employeeReport(startDate, endDate);
      this.employeeReport();
    }
    if (reportType === 'asset') {
      this.tableColumns = COMPUTER_TABLE_COLUMNS;
      this.assetReport(startDate, endDate);
    }
    if (reportType === 'allocation') {
      this.tableColumns = ASSIGNMENT_TABLE_COLUMNS;
      this.allocationReport(startDate, endDate);
    }
    if (reportType === 'transfer') {
      this.tableColumns = TRANSFER_TABLE_COLUMNS;
      this.transferReport(startDate, endDate);
    }
  }

  exportToExcel(): void {
    // const udt: ExcelJson = this.sheetHeader(employeeExcelHeader());
    // employeeExcelData(this.employees, udt);
    let reportTitle: string = '';
    let udt: ExcelJson = undefined!;

    if (this.reportType === 'employee') {
      reportTitle = 'Employees Report';
      udt = this.employeeExcelJson();
    }

    if (this.reportType === 'asset') {
      reportTitle = 'Computers Report';
      udt = this.computerExcelJson();
    }

    if (this.reportType === 'allocation') {
      reportTitle = 'Allocation Report';
      udt = this.allocationExcelJson();
    }

    if (this.reportType === 'transfer') {
      reportTitle = 'Transfer Report';
      udt = this.transferExcelJson();
    }


    this.exportService.exportJsonToExcel(this.excelSheet(udt), reportTitle);
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

  computerExcelJson(): ExcelJson {
    const udt: ExcelJson = this.sheetHeader(computerExcelHeader());
    computerExcelData(this.computers, udt);
    return udt;
  }

  allocationExcelJson(): ExcelJson {
    const udt: ExcelJson = this.sheetHeader(allocationExcelHeader());
    allocationExcelData(this.allocations, udt);
    return udt;
  }

  transferExcelJson(): ExcelJson {
    const udt: ExcelJson = this.sheetHeader(transferExcelHeader());
    transferExcelData(this.transfers, udt);
    return udt;
  }
  // ORIGINAL :::: REVERT HERE IN CASE OF FAILURE
  // paginatedDataSource = () => {
  //   return new PaginationDataSource<Employee, Query<Date>>(
  //     (request: PageRequest<Employee>, query: Query<Date>) => this.employeeService.getEmployees(request, query),
  //     {property: 'firstName', order: 'asc'},
  //     {startDate: undefined!, endDate: undefined!}
  //   )
  // }

  employeeDataSource = () => {
    return new PaginationDataSource<Employee, Query<Date>>(
      (request: PageRequest<Employee>, query: Query<Date>) => this.employeeService.dataForReports(request, query),
      {property: 'firstName', order: 'asc'},
      {startDate: undefined!, endDate: undefined!}
    )
  }

  // employeeReport(startDate: string, endDate: string) {
  //   return this.employeeEndpointService.restEmployeesReportGet(endDate, startDate, 'response').subscribe({
  //       next: (response: HttpResponse<Array<Employee>>): void => {
  //         if (response.status === 200) {
  //           // this.tableData = this.paginatedDataSource();
  //           this.tableData = this.employeeDataSource();
  //           this.employees = response.body!;
  //         } else if (response.status === 204) {
  //           console.log('DIALOG PROMPT FOR NO DATA')
  //         }
  //       }
  //     }
  //   );
  // }

  employeeReport() {
            this.tableData = this.employeeDataSource();
    this.tableData.page$.subscribe({
      next: (page: Page<Employee>): void => {
        this.employees = page.content;
      }
    });
  }

  assetReport(startDate: string, endDate: string) {
    return this.computerEndpointService.restComputersReportGet(endDate, startDate, 'response').subscribe({
        next: (response: HttpResponse<Array<Computer>>): void => {
          if (response.status === 200) {
            // this.tableData = this.paginatedDataSource();
            this.computers = response.body!;
          } else if (response.status === 204) {
            console.log('DIALOG PROMPT FOR NO DATA')
          }
        }
      }
    );
  }

  allocationReport(startDate: string, endDate: string) {
    return this.allocationEndpointService.restAllocationsReportGet(endDate, startDate, 'response').subscribe({
        next: (response: HttpResponse<Array<Allocation>>): void => {
          if (response.status === 200) {
            // this.tableData = this.paginatedDataSource();
            this.allocations = response.body!;
          } else if (response.status === 204) {
            console.log('DIALOG PROMPT FOR NO DATA')
          }
        }
      }
    );
  }

  transferReport(startDate: string, endDate: string) {
    return this.transferEndpointService.restTransfersReportGet(endDate, startDate, 'response').subscribe({
        next: (response: HttpResponse<Array<Transfer>>): void => {
          if (response.status === 200) {
            // this.tableData = this.paginatedDataSource();
            this.transfers = response.body!;
          } else if (response.status === 204) {
            console.log('DIALOG PROMPT FOR NO DATA')
          }
        }
      }
    );
  }

}
