import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductBacklogItemComponent } from './product-backlog-item/product-backlog-item.component';
import { ProductBacklogComponent } from './product-backlog/product-backlog.component';
import { ShippingInformationComponent } from './shipping-information/shipping-information.component';


const routes: Routes = [
  { path: 'product-backlog-item', component: ProductBacklogItemComponent },
  { path: 'product-backlog', component: ProductBacklogComponent },
  { path: 'shipping-information', component: ShippingInformationComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
