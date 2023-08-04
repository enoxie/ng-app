import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateProductComponent } from './product-create/product-create.component';
import { AdminGuard } from '../authentication/services/admin.guard';
import { ProductListComponent } from './product-list/product-list.component';
import { ProductComponent } from './product/product.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'create',
        component: CreateProductComponent,
        canActivate: [AdminGuard],
      },
      { path: '', component: ProductListComponent },
      {
        path: ':productId',
        component: ProductComponent,
      },
      {
        path: 'category/:categoryId',
        component: ProductListComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
