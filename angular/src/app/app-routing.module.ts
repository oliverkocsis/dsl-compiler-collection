import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account/account.component';
import { AccountListComponent } from './account/account-list/account-list.component';
import { AddressComponent } from './address/address/address.component';
import { AddressListComponent } from './address/address-list/address-list.component';
import { ContactComponent } from './contact/contact/contact.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';


const routes: Routes = [
  { path: 'account/list', component: AccountListComponent },
  { path: 'account/edit', component: AccountComponent },
  { path: 'account/edit/:id', component: AccountComponent },
  { path: 'address/list', component: AddressListComponent },
  { path: 'address/edit', component: AddressComponent },
  { path: 'address/edit/:id', component: AddressComponent },
  { path: 'contact/list', component: ContactListComponent },
  { path: 'contact/edit', component: ContactComponent },
  { path: 'contact/edit/:id', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }