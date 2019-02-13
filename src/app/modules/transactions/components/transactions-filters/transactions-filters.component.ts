import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  Output,
  EventEmitter,
  OnDestroy,
  Input,
} from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { untilDestroyed } from 'ngx-take-until-destroy';

import { TransactionCategory, Category } from '@app/core';

export interface FiltersPayload {
  startDate: Date;
  endDate: Date;
  category: TransactionCategory | null;
}

@Component({
  selector: 'app-transactions-filters',
  templateUrl: './transactions-filters.component.html',
  styleUrls: ['./transactions-filters.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionsFiltersComponent implements OnInit, OnDestroy {
  @Input() categories: { [key: string]: Category[] };

  @Output() update = new EventEmitter<FiltersPayload>();

  // Helper date
  currentDate = new Date();

  // Form settings
  transactionFilterForm = this.fb.group({
    // Beginning of current month
    startDate: [
      new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1),
    ],
    // End of current month
    endDate: [
      new Date(
        this.currentDate.getFullYear(),
        this.currentDate.getMonth() + 1,
        0,
      ),
    ],
    category: null,
    type: null,
  });

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.transactionFilterForm.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        this.update.emit({
          startDate: value.startDate,
          endDate: value.endDate,
          category: value.category
            ? { id: value.category.id, name: value.category.name }
            : null,
        });
      });
  }

  ngOnDestroy() {}
}
