import { Injectable } from '@angular/core';
import groupBy from 'lodash-es/groupBy';
import { map } from 'rxjs/operators';

import { CategoriesService, Category } from '@app/core';

@Injectable({
  providedIn: 'root',
})
export class CategoriesFacadeService {
  categories$ = this.categoriesService.categories$;
  groupedCategories$ = this.categories$.pipe(
    map(categories => groupBy(categories, 'type')),
  );

  constructor(private categoriesService: CategoriesService) {}

  addCategory(category: Category) {
    this.categoriesService.addCategory(category);
  }

  editCategory(id: string, payload: Category) {
    this.categoriesService.updateCategory(id, payload);
  }

  deleteCategory(id: string) {
    this.categoriesService.deleteCategory(id);
  }
}
