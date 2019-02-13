import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';
import { shareReplay } from 'rxjs/operators';

export interface Category {
  id?: string;
  name: string;
  type: 'expense' | 'income';
}

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  categories$: Observable<Category[]>;

  constructor(private auth: AuthService, private fsService: FirestoreService) {
    this.categories$ = fsService
      .colWithIds$(`users/${this.userId}/categories`, ref =>
        ref.orderBy('name', 'asc'),
      )
      .pipe(shareReplay(1));
  }

  get userId() {
    return this.auth.user.uid;
  }

  addCategory(category: Category) {
    this.fsService.add(`users/${this.userId}/categories`, category);
  }

  updateCategory(id: string, category: Partial<Category>) {
    this.fsService.update(`users/${this.userId}/categories/${id}`, category);
  }

  deleteCategory(id: string) {
    this.fsService.delete(`users/${this.userId}/categories/${id}`);
  }
}
