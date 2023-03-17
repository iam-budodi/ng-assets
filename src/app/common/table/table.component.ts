import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormComponent } from 'src/app/form/container/form/form.component';
import { ITableColumn } from '../model/table-column.model';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit, AfterViewInit {
  public tableDataSource: any = new MatTableDataSource([]);
  public displayedColumns!: string[];

  @ViewChild(MatPaginator, { static: false }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: false }) matSort!: MatSort;
  @ViewChild(FormComponent) employeeForm!: FormComponent;

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns!: ITableColumn[];
  @Input() deleteActionIcon!: string;
  @Input() updateActionIcon!: string;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[0];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() deleteAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateAction: EventEmitter<any> = new EventEmitter<any>();

  // setter is important to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }
  constructor() {}

  ngOnInit(): void {
    const columnNames = this.tableColumns.map(
      (tableColumn: ITableColumn) => tableColumn.name
    );

    if (this.deleteActionIcon) {
      this.displayedColumns = [
        ...columnNames,
        this.deleteActionIcon,
        this.updateActionIcon,
      ];
    } else {
      this.displayedColumns = columnNames;
    }
  }

  // makes pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  setTableDataSource(data: any) {
    this.tableDataSource = new MatTableDataSource<any>(data);
    this.tableDataSource.paginator = this.paginator;
    this.tableDataSource.sort = this.matSort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLocaleLowerCase();
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
}
