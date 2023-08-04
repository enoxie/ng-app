import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.services';
import { Router } from '@angular/router';
import { CategoryService } from '../../categories/services/category.services';
import { ICategory } from '../../categories/models/category.model';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css'],
  providers: [ProductService, CategoryService],
})
export class CreateProductComponent implements OnInit {
  categories: ICategory[] = [];
  error: string = '';
  model: any = {
    categoryId: '0',
  };
  constructor(
    private productService: ProductService,
    private router: Router,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  createProduct(form: NgForm) {
    if (this.model.name == '') {
      this.error = 'Ürün adı alanı zorunludur';
      return;
    }
    if (this.model.name.length < 3) {
      this.error = 'Ürün adı 2 karakterden büyük olmak zorundadır';
      return;
    }
    if (this.model.price == '') {
      this.error = 'Fiyat alanı zorunludur';
      return;
    }
    const extensions = ['jpeg', 'jpg', 'png'];
    const extension = this.model.imageUrl.split('.').pop();
    if (extensions.indexOf(extension) == -1) {
      this.error = 'Resim uzantısı sadece jpeg, jpg, png olmalıdır';
      return;
    }
    if (this.model.categoryId == 0) {
      this.error = 'Kategori seçimi zorunludur';
      return;
    }
    const product = {
      name: this.model.name,
      price: this.model.price,
      imageUrl: this.model.imageUrl,
      description: this.model.description,
      isActive: this.model.isActive,
      categoryId: this.model.categoryId,
    };

    if (form.valid) {
      this.productService.createProduct(product).subscribe((data) => {
        this.router.navigate(['/products']);
      });
    } else {
      this.error = 'Lütfen formu kontrol ediniz.';
    }
  }
}
