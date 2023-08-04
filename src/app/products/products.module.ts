import { NgModule } from '@angular/core';
import { CreateProductComponent } from './product-create/product-create.component';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CKEditorModule } from 'ckeditor4-angular';
import { AuthenticationModule } from '../authentication/authentication.module';
import { ProductsRoutingModule } from './products-routing.module';

@NgModule({
  declarations: [
    ProductComponent,
    ProductListComponent,
    CreateProductComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    CKEditorModule,
    AuthenticationModule,
    ProductsRoutingModule,
  ],
  exports: [ProductComponent, ProductListComponent, CreateProductComponent],
})
export class ProductsModule {}
