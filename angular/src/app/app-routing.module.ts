import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShippingInformationFormComponent } from './shipping-information-form/shipping-information-form.component';


const routes: Routes = [
  { path: 'shipping-information-form', component: ShippingInformationFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
