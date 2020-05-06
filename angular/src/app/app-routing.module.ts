import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account/account.component';
import { AccountTabComponent } from './account/account-tab/account-tab.component';
import { ContactComponent } from './contact/contact/contact.component';
import { ContactListComponent } from './contact/contact-list/contact-list.component';
import { AccountTableComponent } from './account/account-table/account-table.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';


const routes: Routes = [
  {
    path: 'account', component: AccountComponent,
    children: [
      { path: '', redirectTo: 'list', pathMatch: 'full' },
      { path: 'list', component: AccountTableComponent },
      { path: 'edit', component: AccountTabComponent },
      { path: 'edit/:id', component: AccountTabComponent },
      { path: 'edit/:id/contact/edit', component: ContactFormComponent },
      { path: 'edit/:id/contact/edit/:contactId', component: ContactFormComponent },
    ]
  },
  { path: 'contact/list', component: ContactListComponent },
  { path: 'contact/edit', component: ContactComponent },
  { path: 'contact/edit/:id', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }