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
import { ITableColumn } from '../../employee/model/table-column.model';

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

  @Input() isPageable: boolean = false;
  @Input() isSortable: boolean = false;
  @Input() isFilterable: boolean = false;
  @Input() tableColumns!: ITableColumn[];
  @Input() actionIcons!: string;
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize: number = this.paginationSizes[1];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() deleteAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateAction: EventEmitter<any> = new EventEmitter<any>();

  // setter is important to dynamically get changes from parent component
  @Input() set tableData(data: any[]) {
    this.setTableDataSource(data);
  }
  constructor() {}

  ngOnInit(): void {
    const columnNames: string[] = this.tableColumns.map(
      (tableColumn: ITableColumn) => tableColumn.name
    );

    if (this.actionIcons.length) {
      this.displayedColumns = [...columnNames, this.actionIcons];
    } else {
      this.displayedColumns = columnNames;
    }
  }

  // makes pagination work with *ngIf
  ngAfterViewInit(): void {
    this.tableDataSource.paginator = this.paginator;
  }

  setTableDataSource(data: any): void {
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

  // onPageChange(event: any): void {
  //   this.pageable.pageIndex = event.pageIndex;
  //   this.pageable.pageSize = event.pageSize;
  // }
}
