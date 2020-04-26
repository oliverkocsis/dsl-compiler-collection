import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountTableComponent } from './account/account-table/account-table.component';
import { AccountFormComponent } from './account/account-form/account-form.component';
import { ContactTableComponent } from './contact/contact-table/contact-table.component';
import { ContactFormComponent } from './contact/contact-form/contact-form.component';
import { ProductBacklogTableComponent } from './product-backlog/product-backlog-table/product-backlog-table.component';
import { ProductBacklogFormComponent } from './product-backlog/product-backlog-form/product-backlog-form.component';
import { ProductBacklogItemTableComponent } from './product-backlog-item/product-backlog-item-table/product-backlog-item-table.component';
import { ProductBacklogItemFormComponent } from './product-backlog-item/product-backlog-item-form/product-backlog-item-form.component';

@NgModule({
  declarations: [
    AppComponent,
    AccountFormComponent,
    AccountTableComponent,
    ContactFormComponent,
    ContactTableComponent,
    ProductBacklogFormComponent,
    ProductBacklogTableComponent,
    ProductBacklogItemFormComponent,
    ProductBacklogItemTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatPaginatorModule,
    MatRadioModule,
    MatSelectModule,
    MatSidenavModule,
    MatSortModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
