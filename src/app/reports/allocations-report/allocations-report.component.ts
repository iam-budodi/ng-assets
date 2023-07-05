import { Component } from '@angular/core';
import {ITableColumn} from "../../shared/models/table-column.model";
import {Page, PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {Allocation} from "../../service";
import {Query} from "../../shared/models/query.model";
import {ExcelJson} from "../model/excel-json.model";
import {ExportService} from "../export.service";
import {allocationExcelHeader} from "../utils/headers.report";
import {allocationExcelData} from "../utils/values.report";
import {ASSIGNMENT_TABLE_COLUMNS} from "../../allocation/assign/model/assign-table.config";
import {AssignService} from "../../allocation/assign/assign.service";

@Component({
  selector: 'app-allocations-report',
  templateUrl: './allocations-report.component.html',
  styleUrls: ['./allocations-report.component.css']
})
export class AllocationsReportComponent {
  tableColumns!: ITableColumn[];
  tableData!: PaginationDataSource<Allocation, Query<Date>>;
  pageSizes: number[] = [5, 10, 15, 20, 50];
  defaultSize: number = this.pageSizes[0];
  reportTitle: string = 'Allocation Report';
  udt!: ExcelJson;
  allocations!: Allocation[];
  title: string = 'Specify Date Range to Export Report';

  constructor(
    private exportService: ExportService,
    private assignService: AssignService
  ) {
  }

  ngOnInit(): void {
    this.allocationReport();
  }

  exportToExcel(): void {
    this.udt = this.allocationExcelJson();
    this.exportService.exportJsonToExcel(this.excelSheet(this.udt), this.reportTitle);
  }

  allocationReport(): void {
    this.tableColumns = ASSIGNMENT_TABLE_COLUMNS;
    this.tableData = this.allocationDataSource();
    this.tableData.page$.subscribe({
      next: (page: Page<Allocation>): void => {
        this.allocations = page.content;
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

  allocationExcelJson(): ExcelJson {
    const udt: ExcelJson = this.sheetHeader(allocationExcelHeader());
    allocationExcelData(this.allocations, udt);
    return udt;
  }

  allocationDataSource = () => {
    return new PaginationDataSource<Allocation, Query<Date>>(
      (request: PageRequest<Allocation>, query: Query<Date>) => this.assignService.dataForReports(request, query),
      {property: 'allocationDate', order: 'asc'},
      {startDate: undefined!, endDate: undefined!}
    )
  }

}
