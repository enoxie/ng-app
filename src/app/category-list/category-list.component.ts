import { Component, OnInit } from '@angular/core';
import { ICategory } from '../models/category.model';
import { CategoryService } from '../services/category.services';

@Component({
  selector: 'category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css'],
  providers: [CategoryService],
})
export class CategoryListComponent implements OnInit {
  categories: ICategory[];

  selectedCategory: ICategory | null;
  constructor(private categoryService: CategoryService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  displayAll = true;
  selectCategory(category?: ICategory) {
    if (category) {
      this.selectedCategory = category;
      this.displayAll = false;
    } else {
      this.selectedCategory = null;
      this.displayAll = true;
    }
  }
}
