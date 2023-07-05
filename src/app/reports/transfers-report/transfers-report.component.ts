import { Component } from '@angular/core';
import {ITableColumn} from "../../shared/models/table-column.model";
import {Page, PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {Transfer} from "../../service";
import {Query} from "../../shared/models/query.model";
import {ExcelJson} from "../model/excel-json.model";
import {ExportService} from "../export.service";
import {transferExcelHeader} from "../utils/headers.report";
import {transferExcelData} from "../utils/values.report";
import {TransferService} from "../../allocation/transfer/transfer.service";
import {TRANSFER_TABLE_COLUMNS} from "../../allocation/transfer/model/transfer-table";

@Component({
  selector: 'app-transfers-report',
  templateUrl: './transfers-report.component.html',
  styleUrls: ['./transfers-report.component.css']
})
export class TransfersReportComponent {
  tableColumns!: ITableColumn[];
  tableData!: PaginationDataSource<Transfer, Query<Date>>;
  pageSizes: number[] = [5, 10, 15, 20, 50];
  defaultSize: number = this.pageSizes[0];
  reportTitle: string = 'Change Custodianship Report';
  udt!: ExcelJson;
  transfers!: Transfer[];
  title: string = 'Specify Date Range to Export Report';

  constructor(
    private exportService: ExportService,
    private transferService: TransferService,
  ) {
  }

  ngOnInit(): void {
    this.transferReport();
  }

  exportToExcel(): void {
    this.udt = this.transferExcelJson();
    this.exportService.exportJsonToExcel(this.excelSheet(this.udt), this.reportTitle);
  }

  transferReport(): void {
    this.tableColumns = TRANSFER_TABLE_COLUMNS;
    this.tableData = this.transferDataSource();
    this.tableData.page$.subscribe({
      next: (page: Page<Transfer>): void => {
        this.transfers = page.content;
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

  transferExcelJson(): ExcelJson {
    const udt: ExcelJson = this.sheetHeader(transferExcelHeader());
    transferExcelData(this.transfers, udt);
    return udt;
  }

  transferDataSource = () => {
    return new PaginationDataSource<Transfer, Query<Date>>(
      (request: PageRequest<Transfer>, query: Query<Date>) => this.transferService.dataForReports(request, query),
      {property: 'transferDate', order: 'asc'},
      {startDate: undefined!, endDate: undefined!}
    )
  }

}
