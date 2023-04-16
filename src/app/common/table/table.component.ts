import {
  AfterViewInit, ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Sort } from '@angular/material/sort';
import { ITableColumn } from '../../employee/model/table-column.model';
import {PaginationDataSource} from "ngx-pagination-data-source";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {
  public tableDataSource!: PaginationDataSource<any, any>;
  public displayedColumns!: string[];

  @Input() tableColumns!: ITableColumn[];
  @Input() tableEntries!: PaginationDataSource<any, any>;
  @Input() actionIcons: string = "actions";
  @Input() paginationSizes: number[] = [5, 10, 15, 50];
  @Input() defaultPageSize: number = this.paginationSizes[2];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() deleteAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateAction: EventEmitter<any> = new EventEmitter<any>();

  constructor(private cd: ChangeDetectorRef) {}

  ngOnInit(): void {
    const columnNames: string[] = this.tableColumns.map(
      (tableColumn: ITableColumn) => tableColumn.name
    );

    if (this.actionIcons.length) {
      this.displayedColumns = [...columnNames, this.actionIcons];
    } else {
      this.displayedColumns = columnNames;
    }

    this.tableDataSource = this.tableEntries;
  }


  sortTable(sortParameters: Sort) {
    // define name of data property, to sort by, instead of column name
    sortParameters.active = this.tableColumns.find(
      (column) => column.name === sortParameters.active
    )!.dataKey;
    this.sort.emit(sortParameters);

  }

  deleteRowAction(row: any) {
    this.deleteAction.emit(row);
  }

  updateRowAction(row: any) {
    this.updateAction.emit(row);
  }

  ngAfterViewInit(): void {
    this.cd.detectChanges();
  }

}
