import {AfterViewInit, ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {PaginationDataSource} from "ngx-pagination-data-source";
import {ITableColumn} from "../../../shared/models/table-column.model";
import {Sort} from "@angular/material/sort";

@Component({
  selector: 'report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.css']
})
export class ReportTableComponent implements OnInit, AfterViewInit {
  public tableDataSource!: PaginationDataSource<any, any>;
  public displayedColumns!: string[];

  @Input() tableColumns!: ITableColumn[];
  @Input() tableEntries!: PaginationDataSource<any, any>;
  @Input() paginationSizes: number[] = [8, 16, 24, 50];
  @Input() defaultPageSize: number = this.paginationSizes[2];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.displayedColumns = this.tableColumns.map((tableColumn: ITableColumn) => tableColumn.name);
    this.tableDataSource = this.tableEntries;
  }

  sortTable(sortParameters: Sort) {
    sortParameters.active = this.tableColumns.find(
      (column) => column.name === sortParameters.active
    )!.dataKey;
    this.sort.emit(sortParameters);

  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

}
