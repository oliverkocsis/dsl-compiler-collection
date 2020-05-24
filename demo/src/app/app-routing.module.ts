import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyFormComponent } from './my-form/my-form.component';
import { ShippingAddressComponent } from './shipping-address/shipping-address.component';


const routes: Routes = [
  { path: 'my-form', component: MyFormComponent },
  { path: 'shipping-address', component: ShippingAddressComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
