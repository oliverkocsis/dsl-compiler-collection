import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account/account/account.component';
import { AccountTabComponent } from './account/account-tab/account-tab.component';
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }