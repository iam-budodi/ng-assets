import {Component} from '@angular/core';
import {ITableColumn} from "../../../shared/models/table-column.model";
import {DialogData} from "../../../employee/model/dialog-data.model";
import {PageRequest, PaginationDataSource} from "ngx-pagination-data-source";
import {Category} from "../../../service";
import {Query} from "../../../shared/models/query.model";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogService} from "../../../shared/dialog/dialog.service";
import {ConfirmDialogService} from "../../../shared/dialog/confirm-dialog.service";
import {CategoryService} from "../category.service";
import {CategoryDialogComponent} from "../category-dialog/category-dialog.component";
import {CATEGORY_TABLE_COLUMNS} from "../model/category-table";

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent {
  categoryTableColumns!: ITableColumn[];
  dialogValue!: DialogData<Category>;
  initialPage: number = 0;
  tableData!: PaginationDataSource<Category, Query<any>>;
  categoryButtonLabel: string = 'Add Category';
  pageTitle: string = 'Asset Categories';

  constructor(
    private snackBar: MatSnackBar,
    private dialogService: DialogService,
    private confirmDialogService: ConfirmDialogService,
    private categoryService: CategoryService,
  ) {
  }

  ngOnInit(): void {
    this.categoryTableColumns = CATEGORY_TABLE_COLUMNS;
    this.tableData = new PaginationDataSource<Category, Query<any>>(
      (request: PageRequest<Category>, query: Query<any>) => this.categoryService.getCategories(request, query),
      {property: 'name', order: 'asc'},
      {registration: undefined!, search: undefined!}
    )
  }

  createCategory = () => {
    this.dialogValue = {mode: 'create'};
    this.openCategoryDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully added category`, 'Close', {
              duration: 5000,
              panelClass: 'success-snackbar'
            }
          );
        }
      }
    );
  };

  updateCategory = (category: Category): void => {
    this.dialogValue = {mode: 'edit', dataObject: category};
    this.openCategoryDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully updated category`, 'Close', {
              duration: 5000,
              panelClass: 'success-snackbar',
            }
          );
        }
      }
    );
  };

  deleteCategory = (category: Category): void => {
    this.dialogValue = {mode: 'delete', dataObject: category};
    this.openConfirmationDialog(this.dialogValue).afterClosed().subscribe(result => {
        if (result === 'success') {
          this.reloadDataOnChanges();
          this.snackBar.open(`Successfully deleted category`, 'Close', {
              duration: 5000,
              panelClass: 'success-snackbar'
            }
          );
        }
      }
    );
  };

  // Remember this when  allocation on same screen
  reloadDataOnChanges(): void {
    this.tableData.fetch(this.initialPage);
  }

  openCategoryDialog(dialogValue: DialogData<Category>) {
    return this.dialogService.open(CategoryDialogComponent, dialogValue);
  }

  openConfirmationDialog(dialogValue: DialogData<Category>) {
    return this.confirmDialogService.open(CategoryDialogComponent, dialogValue);
  }
}
