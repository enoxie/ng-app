import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../models/category.model';
import { Observable, exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from 'src/app/authentication/services/auth.service';
import { environment } from 'src/.environments/environment';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  private url = environment.databaseUrl;

  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(this.url + 'categories.json').pipe(
      map((data) => {
        const categories: ICategory[] = [];
        for (const key in data) {
          categories.push({ ...data[key], id: key });
        }

        return categories;
      })
    );
  }

  createCategories(category: ICategory): Observable<ICategory> {
    return this.authService.user.pipe(
      take(1),
      tap((user) => console.log(user)),
      exhaustMap((user) => {
        return this.http.post<ICategory>(
          this.url + 'categories.json?auth=' + user?.token,
          category
        );
      })
    );
  }
}
