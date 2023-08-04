import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, map, tap } from 'rxjs';
import { AuthService } from './auth.service';
import { environment } from 'src/.environments/environment';
@Injectable({ providedIn: 'root' })
export class AdminGuard implements CanActivate {
  constructor(private router: Router, private authService: AuthService) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean | Observable<boolean | UrlTree> {
    return this.authService.user.pipe(
      map((user) => {
        return user?.email == environment.adminEmail ? true : false;
      }),
      tap((isAdmin) => {
        if (!isAdmin) {
          this.router.navigate(['/auth']);
        }
      })
    );
  }
}
