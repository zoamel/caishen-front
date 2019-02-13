import { Component, OnDestroy, ViewContainerRef } from '@angular/core';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { TdDialogService } from '@covalent/core/dialogs';
import { TranslateService } from '@ngx-translate/core';

import { Category } from '@app/core';
import { CategoryDialogComponent } from '../../components/category-dialog/category-dialog.component';
import { CategoriesFacadeService } from '../../services/categories.facade';

@Component({
  selector: 'app-categories',
  styleUrls: ['./categories.component.scss'],
  templateUrl: './categories.component.html',
})
export class CategoriesComponent implements OnDestroy {
  categories$ = this.categoriesFacade.groupedCategories$;

  constructor(
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    private dialogService: TdDialogService,
    private translate: TranslateService,
    private categoriesFacade: CategoriesFacadeService,
  ) {}

  ngOnDestroy() {}

  handleAddCategory(type: string) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: type,
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((category: Category) => {
        if (category) {
          this.categoriesFacade.addCategory({
            type: category.type,
            name: category.name,
          });
        }
      });
  }

  handleEditCategory(category: Partial<Category>) {
    const dialogRef = this.dialog.open(CategoryDialogComponent, {
      width: '400px',
      data: category,
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((updatedCategory: Category) => {
        if (updatedCategory) {
          this.categoriesFacade.editCategory(category.id, {
            name: updatedCategory.name,
            type: updatedCategory.type,
          });
        }
      });
  }

  handleDeleteCategory(id: string) {
    this.dialogService
      .openConfirm({
        message: this.translate.instant('remove_category_confirm'),
        acceptButton: this.translate.instant('accept'),
        cancelButton: this.translate.instant('decline'),
        viewContainerRef: this.viewContainerRef,
      })
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((accept: boolean) => {
        if (accept) {
          this.categoriesFacade.deleteCategory(id);
        }
      });
  }
}
