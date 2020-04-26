import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountTableComponent } from './account/account-table/account-table.component';
import { AccountFormComponent } from './account/account-form/account-form.component';
import { ContactTableComponent } from './contact/contact-table/contact-table.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { ProductBacklogTableComponent } from './product-backlog/product-backlog-table/product-backlog-table.component';
import { ProductBacklogFormComponent } from './product-backlog/product-backlog-form/product-backlog-form.component';
import { ProductBacklogItemTableComponent } from './product-backlog-item/product-backlog-item-table/product-backlog-item-table.component';
import { ProductBacklogItemFormComponent } from './product-backlog-item/product-backlog-item-form/product-backlog-item-form.component';

const routes: Routes = [
  { path: 'account-table', component: AccountTableComponent },
  { path: 'account-form', component: AccountFormComponent },
  { path: 'account-form/:id', component: AccountFormComponent },
  { path: 'contact-table', component: ContactTableComponent },
  { path: 'contact-form', component: ContactFormComponent },
  { path: 'contact-form/:id', component: ContactFormComponent },
  { path: 'product-backlog-table', component: ProductBacklogTableComponent },
  { path: 'product-backlog-form', component: ProductBacklogFormComponent },
  { path: 'product-backlog-form/:id', component: ProductBacklogFormComponent },
  { path: 'product-backlog-item-table', component: ProductBacklogItemTableComponent },
  { path: 'product-backlog-item-form', component: ProductBacklogItemFormComponent },
  { path: 'product-backlog-item-form/:id', component: ProductBacklogItemFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
