import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/auth-response.model';
import { BehaviorSubject, Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/.environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiKey = environment.apiKey;
  user = new BehaviorSubject<User | null>(null);
  private registerUrl = environment.signupUrl + this.apiKey;
  constructor(private http: HttpClient) {}

  register(email: string, password: string) {
    return this.http
      .post<AuthResponse>(this.registerUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((data) => {
          this.handleUser(
            data.email,
            data.localId,
            data.idToken,
            data.expiresIn
          );
        })
      );
  }
  private loginUrl = environment.loginUrl + this.apiKey;
  login(email: string, password: string) {
    return this.http
      .post<AuthResponse>(this.loginUrl, {
        email: email,
        password: password,
        returnSecureToken: true,
      })
      .pipe(
        tap((data) => {
          this.handleUser(
            data.email,
            data.localId,
            data.idToken,
            data.expiresIn
          );
        }),
        catchError(this.handleError)
      );
  }

  logout() {
    this.user.next(null);
    localStorage.removeItem('user');
  }
  private handleError(err: HttpErrorResponse) {
    let message = 'Bir hata oluştu!';
    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        message = 'Bu mail adresi kullanılıyor.';
        break;
      case 'INVALID_PASSWORD':
        message = 'Girdiğiniz şifre eksik veya hatalı';
        break;
      case 'USER_DISABLED':
        message = 'Girdiğiniz hesap kullanım dışıdır.';
        break;
    }
    return throwError(() => message);
  }

  private handleUser(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: string
  ) {
    const expirationDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expirationDate);
    console.log(user);
    this.user.next(user);
    localStorage.setItem('user', JSON.stringify(user));
  }

  autoLogin() {
    if (localStorage.getItem('user') == null) {
      return;
    }

    const user = JSON.parse(localStorage.getItem('user') || '{}');

    const loadedUser = new User(
      user.email,
      user.id,
      user._token,
      new Date(user._tokenExpire)
    );

    if (loadedUser.token) {
      this.user.next(loadedUser);
    }
  }
}
