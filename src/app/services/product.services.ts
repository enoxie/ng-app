import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/product.model';
import { Observable, delay, map } from 'rxjs';

@Injectable()
export class ProductService {
  constructor(private http: HttpClient) {}
  private url =
    'https://ng-app-bf51f-default-rtdb.europe-west1.firebasedatabase.app/';

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
    return this.http.post<IProduct>(this.url + 'products.json', product);
  }
}
