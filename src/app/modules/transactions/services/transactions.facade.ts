import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

import { CategoriesService, Transaction, TransactionsService } from '@app/core';
import groupBy from 'lodash-es/groupBy';
import { FiltersPayload } from '@app/modules/transactions/components/transactions-filters/transactions-filters.component';

@Injectable({
  providedIn: 'root',
})
export class TransactionsFacadeService {
  // Transactions
  transactions$ = this.transactionsService.transactions$;

  // Categories
  categories$ = this.categoriesService.categories$;
  groupedCategories$ = this.categories$.pipe(
    map(categories => groupBy(categories, 'type')),
  );

  constructor(
    private transactionsService: TransactionsService,
    private categoriesService: CategoriesService,
  ) {}

  setFilters(filters: FiltersPayload) {
    this.transactionsService.setFilters(filters);
  }

  addTransaction(transaction: Transaction) {
    this.transactionsService.addTransaction(transaction);
  }

  updateTransaction(transaction: Transaction) {
    this.transactionsService.updateTransaction(transaction);
  }

  deleteTransaction(id: string) {
    this.transactionsService.deleteTransaction(id);
  }
}
