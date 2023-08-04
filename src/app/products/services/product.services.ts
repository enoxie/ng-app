import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { Observable, delay, exhaustMap, map, take, tap } from 'rxjs';
import { AuthService } from '../../authentication/services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  private url = environment.databaseUrl;

  getProducts(categoryId: number): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(this.url + 'products.json').pipe(
      map((data) => {
        const products: IProduct[] = [];
        for (const key in data) {
          if (categoryId) {
            if (categoryId == data[key].categoryId) {
              products.push({ ...data[key], id: key });
            }
          } else {
            products.push({ ...data[key], id: key });
          }
        }
        return products;
      }),
      delay(500)
    );
  }

  getProductById(productId: any): Observable<IProduct> {
    return this.http
      .get<IProduct>(this.url + 'products/' + productId + '.json')
      .pipe(delay(500));
  }

  createProduct(product: IProduct): Observable<IProduct> {
    return this.authService.user.pipe(
      take(1),
      tap((user) => console.log(user)),
      exhaustMap((user) => {
        return this.http.post<IProduct>(
          this.url + 'products.json?auth=' + user?.token,
          product
        );
      })
    );
  }
}
