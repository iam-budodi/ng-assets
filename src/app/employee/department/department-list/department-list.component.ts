import {Component, OnInit, ViewChild} from '@angular/core';
import {PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {Department} from "../../../service";
import {Query} from "../../../shared/query.model";
import {DialogService} from "../../../dialog/dialog.service";
import {DepartmentService} from "../department.service";
import {FormComponent} from "../../../form/container/form/form.component";
import {ITableColumn} from "../../model/table-column.model";
import {DEPARTMENT_TABLE_COLUMNS} from "../model/dept-form.config";

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css']
})
export class DepartmentListComponent implements OnInit {
  @ViewChild(FormComponent) form!: FormComponent;
  departmentTableColumns!: ITableColumn[];
  addDeptButtonLabel: string = 'Add Department';
  pageTitle: string = 'Department Information';

  tableData: PaginationDataSource<Department, Query<any>> = new PaginationDataSource<Department, Query<any>>(
    (request: PageRequest<Department>, query: Query<any>) => this.departmentService.page(request, query),
    {property: 'name', order: 'asc'},
    {registration: undefined, search: undefined!}
  )

  constructor(
    private dialogService: DialogService,
    private departmentService: DepartmentService,
  ) {}

  ngOnInit(): void {
      this.departmentTableColumns = DEPARTMENT_TABLE_COLUMNS;
  }

  createDepartment() {

  }

}
