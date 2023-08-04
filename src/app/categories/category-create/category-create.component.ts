import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.services';
import { Router } from '@angular/router';

@Component({
  selector: 'category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.css'],
  providers: [CategoryService],
})
export class CreateCategoryComponent implements OnInit {
  constructor(
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  createCategory(name: any) {
    this.categoryService
      .createCategories({ name: name.value })
      .subscribe((data) => {
        this.router.navigate(['/']);
      });
  }
}
