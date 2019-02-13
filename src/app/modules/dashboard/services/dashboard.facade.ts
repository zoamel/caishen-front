import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import groupBy from 'lodash-es/groupBy';
import { Observable } from 'rxjs';

import { TransactionsService, Transaction } from '@app/core';

export interface TransactionsStats {
  expense?: {
    byCategory: {
      [key: string]: number;
    };
    total: number;
  };

  income?: {
    byCategory: {
      [key: string]: number;
    };
    total: number;
  };
}

@Injectable({
  providedIn: 'root',
})
export class DashboardFacadeService {
  statistics$: Observable<
    TransactionsStats
  > = this.transactionsService.transactions$.pipe(
    map(values => {
      const groupedValues = groupBy(values, 'type');
      const expensesStats = this.calculateStats(groupedValues.expense);
      const incomeStats = this.calculateStats(groupedValues.income);

      return {
        income: incomeStats,
        expense: expensesStats,
      };
    }),
  );

  constructor(private transactionsService: TransactionsService) {}

  private calculateStats(data: Transaction[] = []) {
    return data.reduce(
      (acc, current) => {
        const categoryName = current.category.name;

        if (acc.byCategory[categoryName]) {
          acc.byCategory[categoryName] =
            acc.byCategory[categoryName] + current.amount;
        } else {
          acc.byCategory[categoryName] = current.amount;
        }

        acc.total = acc.total + current.amount;

        return acc;
      },
      { byCategory: {}, total: 0 },
    );
  }
}
