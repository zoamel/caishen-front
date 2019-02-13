import { Component, OnDestroy, ViewContainerRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { TdDialogService } from '@covalent/core/dialogs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { TranslateService } from '@ngx-translate/core';

import { Transaction } from '@app/core';
import { FiltersPayload } from '../../components/transactions-filters/transactions-filters.component';
import { TransactionDialogComponent } from '../../components/transaction-dialog/transaction-dialog.component';
import { TransactionsFacadeService } from '../../services/transactions.facade';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.scss'],
})
export class TransactionsComponent implements OnDestroy {
  transactions$ = this.transactionsFacade.transactions$;
  groupedCategories$ = this.transactionsFacade.groupedCategories$;

  constructor(
    private dialog: MatDialog,
    private viewContainerRef: ViewContainerRef,
    private dialogService: TdDialogService,
    private translate: TranslateService,
    private transactionsFacade: TransactionsFacadeService,
  ) {}

  ngOnDestroy() {}

  handleFiltersUpdate(filters: FiltersPayload) {
    this.transactionsFacade.setFilters(filters);
  }

  handleAddTransaction() {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((data: Transaction) => {
        if (data) {
          this.transactionsFacade.addTransaction(data);
        }
      });
  }

  handleEditTransaction(transaction: Transaction) {
    const dialogRef = this.dialog.open(TransactionDialogComponent, {
      width: '400px',
      data: transaction,
    });

    dialogRef
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((data: Transaction) => {
        if (data) {
          const updatedTransaction: Transaction = {
            ...transaction,
            ...data,
          };

          this.transactionsFacade.updateTransaction(updatedTransaction);
        }
      });
  }

  handleDeleteTransaction(id: string) {
    this.dialogService
      .openConfirm({
        message: this.translate.instant('remove_transaction_confirm'),
        acceptButton: this.translate.instant('accept'),
        cancelButton: this.translate.instant('decline'),
        viewContainerRef: this.viewContainerRef,
      })
      .afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe((accept: boolean) => {
        if (accept) {
          this.transactionsFacade.deleteTransaction(id);
        }
      });
  }
}
