import { Component, OnInit } from '@angular/core';
import { IProduct } from '../models/product.model';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { ProductService } from '../services/product.services';
import { CategoryService } from '../../categories/services/category.services';

@Component({
  selector: 'product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
  providers: [ProductService, CategoryService],
})
export class ProductListComponent implements OnInit {
  products: IProduct[] = [];
  loading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService
  ) {}
  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.loading = true;
      this.ProductService.getProducts(params['categoryId']).subscribe(
        (data) => {
          this.loading = false;
          this.products = data;
        }
      );
    });
  }
}
