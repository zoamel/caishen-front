import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import * as firebase from 'firebase';
import { shareReplay, switchMap } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { FirestoreService } from './firestore.service';

export interface TransactionCategory {
  id: string;
  name: string;
}

export interface Transaction {
  id?: string;
  type: string;
  date: firebase.firestore.Timestamp;
  category: TransactionCategory;
  amount: number;
  note?: string;
}

export interface TransactionFilters {
  startDate: Date;
  endDate: Date;
  type?: string | null;
  category: TransactionCategory | null;
}

@Injectable({ providedIn: 'root' })
export class TransactionsService {
  transactions$: Observable<Transaction[]>;
  transactionsFilters$: BehaviorSubject<TransactionFilters | null>;

  constructor(private auth: AuthService, private fsService: FirestoreService) {
    const date = new Date();

    this.transactionsFilters$ = new BehaviorSubject({
      startDate: new Date(date.getFullYear(), date.getMonth(), 1),
      endDate: new Date(date.getFullYear(), date.getMonth() + 1, 0),
      type: null,
      category: null,
    });

    this.transactions$ = combineLatest(this.transactionsFilters$).pipe(
      switchMap(([filters]) =>
        this.fsService
          .colWithIds$(`users/${this.userId}/transactions`, ref => {
            let query:
              | firebase.firestore.CollectionReference
              | firebase.firestore.Query = ref;

            if (filters.startDate) {
              query = query.where('date', '>=', filters.startDate);
            }

            if (filters.endDate) {
              query = query.where('date', '<=', filters.endDate);
            }

            if (filters.category) {
              query = query.where('category', '==', filters.category);
            }

            query = query.orderBy('date', 'desc');

            return query;
          })
          .pipe(shareReplay(1)),
      ),
    );
  }

  get userId() {
    return this.auth.user.uid;
  }

  addTransaction(transaction: Transaction) {
    this.fsService.add(`users/${this.userId}/transactions`, transaction);
  }

  updateTransaction(transaction: Transaction) {
    this.fsService.update(
      `users/${this.userId}/transactions/${transaction.id}`,
      transaction,
    );
  }

  deleteTransaction(id: string) {
    this.fsService.delete(`users/${this.userId}/transactions/${id}`);
  }

  setFilters(filtersData: TransactionFilters) {
    this.transactionsFilters$.next(filtersData);
  }
}
