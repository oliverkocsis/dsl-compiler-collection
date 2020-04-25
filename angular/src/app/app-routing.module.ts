import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductBacklogTableComponent } from './product-backlog/product-backlog-table/product-backlog-table.component';
import { ProductBacklogFormComponent } from './product-backlog/product-backlog-form/product-backlog-form.component';
import { ProductBacklogItemTableComponent } from './product-backlog-item/product-backlog-item-table/product-backlog-item-table.component';
import { ProductBacklogItemFormComponent } from './product-backlog-item/product-backlog-item-form/product-backlog-item-form.component';

const routes: Routes = [
  { path: 'product-backlog-item-table', component: ProductBacklogItemTableComponent },
  { path: 'product-backlog-item-form', component: ProductBacklogItemFormComponent },
  { path: 'product-backlog-item-form/:id', component: ProductBacklogItemFormComponent },
  { path: 'product-backlog-table', component: ProductBacklogTableComponent },
  { path: 'product-backlog-form', component: ProductBacklogFormComponent },
  { path: 'product-backlog-form/:id', component: ProductBacklogFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
