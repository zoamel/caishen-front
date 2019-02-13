import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '@app/shared';
import { TransactionsRoutingModule } from './transactions-routing.module';
import { TransactionsComponent } from './pages/transactions/transactions.component';
import { TransactionDialogComponent } from './components/transaction-dialog/transaction-dialog.component';
import { TransactionsFiltersComponent } from './components/transactions-filters/transactions-filters.component';
import { TransactionsTableComponent } from './components/transactions-table/transactions-table.component';

@NgModule({
  imports: [ReactiveFormsModule, SharedModule, TransactionsRoutingModule],
  declarations: [
    TransactionsComponent,
    TransactionDialogComponent,
    TransactionsFiltersComponent,
    TransactionsTableComponent,
  ],
  entryComponents: [TransactionDialogComponent],
})
export class TransactionsModule {}
