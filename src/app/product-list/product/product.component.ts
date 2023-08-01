import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.services';

@Component({
  selector: 'product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService],
})
export class ProductComponent implements OnInit {
  product: IProduct | undefined;
  loading: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private ProductService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['productId'];
      this.loading = true;
      this.ProductService.getProductById(id).subscribe((result) => {
        this.product = { ...result, id: id };
        this.loading = false;
      });
    });
  }
}
