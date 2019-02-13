import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './pages/categories/categories.component';
import { CategoryDialogComponent } from './components/category-dialog/category-dialog.component';
import { CategoriesTableComponent } from './components/categories-table/categories-table.component';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoryDialogComponent,
    CategoriesTableComponent,
  ],
  imports: [ReactiveFormsModule, SharedModule, CategoriesRoutingModule],
  entryComponents: [CategoryDialogComponent],
})
export class CategoriesModule {}
