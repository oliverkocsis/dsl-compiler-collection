import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ProductBacklogItemComponent } from './product-backlog-item/product-backlog-item.component';
import { ProductBacklogItemFormComponent } from './product-backlog-item/product-backlog-item-form/product-backlog-item-form.component';
import { ProductBacklogItemTableComponent } from './product-backlog-item/product-backlog-item-table/product-backlog-item-table.component';
import { ProductBacklogComponent } from './product-backlog/product-backlog.component';
import { ProductBacklogFormComponent } from './product-backlog/product-backlog-form/product-backlog-form.component';
import { ProductBacklogTableComponent } from './product-backlog/product-backlog-table/product-backlog-table.component';
import { ShippingInformationComponent } from './shipping-information/shipping-information.component';
import { ShippingInformationFormComponent } from './shipping-information/shipping-information-form/shipping-information-form.component';
import { ShippingInformationTableComponent } from './shipping-information/shipping-information-table/shipping-information-table.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductBacklogItemComponent,
    ProductBacklogItemFormComponent,
    ProductBacklogItemTableComponent,
    ProductBacklogComponent,
    ProductBacklogFormComponent,
    ProductBacklogTableComponent,
    ShippingInformationComponent,
    ShippingInformationFormComponent,
    ShippingInformationTableComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
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
