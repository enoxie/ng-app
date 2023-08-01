import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthResponse } from '../models/authResponse.model';
import { Subject, catchError, tap, throwError } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiKey = 'AIzaSyAZe6Agld3PT1Ns7wBjx5A5-H909cYVFv0';
  user = new Subject<User>();
  private registerUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
    this.apiKey;
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
  private loginUrl =
    'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
    this.apiKey;
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
    this.user.next(user);
  }
}
