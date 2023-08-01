import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ICategory } from '../models/category.model';
import { Observable, map } from 'rxjs';

@Injectable()
export class CategoryService {
  constructor(private http: HttpClient) {}
  private url =
    'https://ng-app-bf51f-default-rtdb.europe-west1.firebasedatabase.app/';

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
    return this.http.post<ICategory>(this.url + 'categories.json', category);
  }
}
