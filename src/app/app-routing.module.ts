import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product-list/product/product.component';
import { CreateProductComponent } from './product-create/product-create.component';
import { CreateCategoryComponent } from './category-create/category-create.component';
import { AuthComponent } from './auth/auth.component';
import { ObservableComponent } from './observable/observable.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'products/create', component: CreateProductComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'products/:productId', component: ProductComponent },
  { path: 'products/category/:categoryId', component: ProductListComponent },
  { path: 'category/create', component: CreateCategoryComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'observable', component: ObservableComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
