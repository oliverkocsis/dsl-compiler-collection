import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductBacklogItemFormComponent } from './product-backlog-item/product-backlog-item-form/product-backlog-item-form.component';
import { ProductBacklogItemTableComponent } from './product-backlog-item/product-backlog-item-table/product-backlog-item-table.component';
import { ProductBacklogFormComponent } from './product-backlog/product-backlog-form/product-backlog-form.component';
import { ProductBacklogTableComponent } from './product-backlog/product-backlog-table/product-backlog-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductBacklogItemFormComponent,
    ProductBacklogItemTableComponent,
    ProductBacklogFormComponent,
    ProductBacklogTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatToolbarModule,
    MatListModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
