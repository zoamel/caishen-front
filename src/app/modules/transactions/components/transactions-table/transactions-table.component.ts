import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { Transaction } from '@app/core';

@Component({
  selector: 'app-transactions-table',
  templateUrl: './transactions-table.component.html',
  styleUrls: ['./transactions-table.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsTableComponent {
  @Input() transactions: Transaction[];

  @Output() delete = new EventEmitter<string>();
  @Output() edit = new EventEmitter<Transaction>();

  currencySymbol = this.translate.instant('currency_symbol');

  // Table config
  displayedColumns: string[] = [
    'date',
    'categoryName',
    'amount',
    'type',
    'note',
    'actions',
  ];

  constructor(private translate: TranslateService) {}
}
