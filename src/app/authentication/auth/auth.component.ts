import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { AuthResponse } from '../models/auth-response.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css'],
})
export class AuthComponent implements OnInit {
  isLoginMode: boolean = true;
  error: string;
  user: Object;
  loading = false;

  constructor(private authServices: AuthService, private router: Router) {}

  ngOnInit(): void {}

  toggleButton() {
    this.isLoginMode = !this.isLoginMode;
  }

  handleForm(form: NgForm) {
    this.loading = true;
    const credentials = {
      email: form.value.email,
      password: form.value.password,
    };

    let authResponse: Observable<AuthResponse>;
    if (!this.isLoginMode) {
      authResponse = this.authServices.register(
        credentials.email,
        credentials.password
      );
    } else {
      authResponse = this.authServices.login(
        credentials.email,
        credentials.password
      );
    }

    authResponse.subscribe({
      next: (response) => {
        this.loading = false;
        this.error = '';
        this.router.navigate(['/']);
      },

      error: (err) => {
        this.loading = false;
        this.error = err;
      },
    });
  }
}
