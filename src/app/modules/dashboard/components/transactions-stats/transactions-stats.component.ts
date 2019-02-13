import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnChanges,
} from '@angular/core';
import orderBy from 'lodash-es/orderBy';

import { TransactionsStats } from '../../services/dashboard.facade';

@Component({
  selector: 'app-transactions-stats',
  templateUrl: './transactions-stats.component.html',
  styleUrls: ['./transactions-stats.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsStatsComponent implements OnChanges {
  @Input() stats: TransactionsStats;

  currentDate = new Date();

  expensesData = [];

  ngOnChanges() {
    if (this.stats) {
      this.expensesData = this.prepareExpensesData(
        this.stats.expense.byCategory,
      );
    }
  }

  private prepareExpensesData(data: { [key: string]: number }) {
    if (data) {
      let chartData = [];
      const keys = Object.keys(data);

      keys.forEach(key => {
        chartData = [...chartData, { name: key, value: data[key] / 100 }];
      });

      return orderBy(chartData, ['value'], ['desc']);
    }
  }
}
