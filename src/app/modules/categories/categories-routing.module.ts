import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard, LayoutComponent } from '@app/core';
import { CategoriesComponent } from './pages/categories/categories.component';

const routes: Routes = [
  {
    path: 'categories',
    canActivate: [AuthGuard],
    component: LayoutComponent,
    children: [{ path: '', component: CategoriesComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriesRoutingModule {}
