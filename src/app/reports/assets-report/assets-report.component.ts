import { Component } from '@angular/core';
import {Page, PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {
  Computer,
} from "../../service";
import {Query} from "../../shared/models/query.model";
import {ExcelJson} from "../model/excel-json.model";
import {computerExcelHeader} from "../utils/headers.report";
import {computerExcelData} from "../utils/values.report";
import {ExportService} from "../export.service";
import {ComputerService} from "../../inventory/computer/computer.service";
import {ITableColumn} from "../../shared/models/table-column.model";
import {COMPUTER_TABLE_COLUMNS} from "../../inventory/computer/model/computer-table.config";

@Component({
  selector: 'app-assets-report',
  templateUrl: './assets-report.component.html',
  styleUrls: ['./assets-report.component.css']
})
export class AssetsReportComponent {
  tableColumns!: ITableColumn[];
  tableData!: PaginationDataSource<Computer, Query<Date>>;
  pageSizes: number[] = [5, 10, 15, 20, 50];
  defaultSize: number = this.pageSizes[0];
  reportTitle: string = 'Assets Report';
  udt!: ExcelJson;
  computers!: Computer[];
  title: string = 'Specify Date Range to Export Report';

  constructor(
    private exportService: ExportService,
    private computerService: ComputerService
  ) {
  }

  ngOnInit(): void {
    this.computerReport();
  }

  exportToExcel(): void {
    this.udt = this.computerExcelJson();
    this.exportService.exportJsonToExcel(this.excelSheet(this.udt), this.reportTitle);
  }


  computerReport(): void {
    this.tableColumns = COMPUTER_TABLE_COLUMNS;
    this.tableData = this.computerDataSource();
    this.tableData.page$.subscribe({
      next: (page: Page<Computer>): void => {
        this.computers = page.content;
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

  computerExcelJson(): ExcelJson {
    const udt: ExcelJson = this.sheetHeader(computerExcelHeader());
    computerExcelData(this.computers, udt);
    return udt;
  }

  computerDataSource = () => {
    return new PaginationDataSource<Computer, Query<Date>>(
      (request: PageRequest<Computer>, query: Query<Date>) => this.computerService.dataForReports(request, query),
      {property: 'brand', order: 'asc'},
      {startDate: undefined!, endDate: undefined!}
    )
  }
}
