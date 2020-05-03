import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account/account.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { AddressComponent } from './address/address/address.component';
import { AddressListComponent } from './address/address-list/address-list.component';


const routes: Routes = [
  { path: 'account', component: AccountComponent },
  { path: 'account/:id', component: AccountComponent },
  { path: 'account-list', component: AccountListComponent },
  { path: 'address', component: AddressComponent },
  { path: 'address/:id', component: AddressComponent },
  { path: 'address-list', component: AddressListComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }