import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import { MatSort, Sort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { FormComponent } from 'src/app/form/container/form/form.component';
import { ITableColumn } from '../../employee/model/table-column.model';
import {PaginationDataSource} from "ngx-pagination-data-source";
import {Employee} from "../../service";
import {EmployeeQuery} from "../../employee/employee-list/employee-list.component";

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  public tableDataSource!: PaginationDataSource<Employee, EmployeeQuery>;
  public displayedColumns!: string[];

  @Input() tableColumns!: ITableColumn[];
  @Input() tableEntries!: PaginationDataSource<Employee, EmployeeQuery>;
  @Input() actionIcons: string = "actions";
  @Input() paginationSizes: number[] = [5, 10, 15];
  @Input() defaultPageSize: number = this.paginationSizes[1];

  @Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() deleteAction: EventEmitter<any> = new EventEmitter<any>();
  @Output() updateAction: EventEmitter<any> = new EventEmitter<any>();

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

}
