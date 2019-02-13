import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '@app/core';

@Component({
  selector: 'app-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  loggingIn = false;
  error = false;

  constructor(private authService: AuthService, private router: Router) {}

  async login() {
    this.loggingIn = true;

    try {
      await this.authService.loginAnonymously();
      this.loggingIn = false;
      this.router.navigate(['/dashboard']);
    } catch {
      this.loggingIn = false;
      this.error = true;
    }
  }
}
