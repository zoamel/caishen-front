import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

export interface User {
  uid: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  readonly authState$: Observable<User | null> = this.fireAuth.authState;

  constructor(private fireAuth: AngularFireAuth) {}

  get user(): User | null {
    return this.fireAuth.auth.currentUser;
  }

  loginAnonymously() {
    return this.fireAuth.auth
      .signInAnonymously()
      .then(() => console.log('Login successful'))
      .catch(error => console.log(error));
  }

  logout() {
    return this.fireAuth.auth.signOut();
  }
}
