import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../authentication/services/admin.guard';
import { CreateCategoryComponent } from './category-create/category-create.component';

const routes: Routes = [
  {
    path: 'category/create',
    component: CreateCategoryComponent,
    canActivate: [AdminGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
