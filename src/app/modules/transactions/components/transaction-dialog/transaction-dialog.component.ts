import {
  Component,
  OnDestroy,
  OnInit,
  Inject,
  ChangeDetectionStrategy,
} from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { untilDestroyed } from 'ngx-take-until-destroy';
import groupBy from 'lodash-es/groupBy';

import { CategoriesService, Transaction, Category } from '@app/core';

@Component({
  selector: 'app-transaction-dialog',
  styleUrls: ['./transaction-dialog.component.scss'],
  templateUrl: './transaction-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionDialogComponent implements OnInit, OnDestroy {
  categories: Category[];
  categoriesByType: {
    [key: string]: Category[];
  };

  transactionForm = this.fb.group({
    amount: ['', [Validators.required]],
    date: [new Date(), [Validators.required]],
    category: ['', [Validators.required]],
    note: '',
  });

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<TransactionDialogComponent>,
    private categoriesService: CategoriesService,
    @Inject(MAT_DIALOG_DATA) public data: Transaction,
  ) {}

  ngOnInit() {
    this.categoriesService.categories$
      .pipe(untilDestroyed(this))
      .subscribe(categories => {
        this.categories = categories;
        this.categoriesByType = groupBy(categories, 'type');
      });

    if (this.data) {
      this.transactionForm.patchValue({
        amount: this.data.amount / 100,
        date: this.data.date.toDate(),
        category: this.data.category.id,
        note: this.data.note,
      });
    }
  }

  ngOnDestroy() {}

  onCancel(): void {
    this.dialogRef.close();
  }

  onSave() {
    if (this.transactionForm.valid) {
      const selectedCategory = this.categories.find(
        category => category.id === this.transactionForm.get('category').value,
      );

      const transaction: Transaction = {
        type: selectedCategory.type,
        date: this.transactionForm.get('date').value,
        category: {
          id: selectedCategory.id,
          name: selectedCategory.name,
        },
        amount: this.transactionForm.get('amount').value * 100,
        note: this.transactionForm.get('note').value,
      };

      this.dialogRef.close(transaction);
    }
  }
}
