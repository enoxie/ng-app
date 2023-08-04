import { NgModule } from '@angular/core';
import { CreateCategoryComponent } from './category-create/category-create.component';
import { CategoryListComponent } from './category-list/category-list.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminGuard } from '../authentication/services/admin.guard';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CategoriesRoutingModule } from './categories-routing.module';

@NgModule({
  declarations: [CategoryListComponent, CreateCategoryComponent],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AuthenticationModule,
    CategoriesRoutingModule,
  ],
  exports: [CategoryListComponent, CreateCategoryComponent],
})
export class CategoriesModule {}
