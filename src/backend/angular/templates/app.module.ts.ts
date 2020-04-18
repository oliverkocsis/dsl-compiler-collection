export const APP_MODULE_TEMPLATE = `import { BrowserModule } from '@angular/platform-browser';
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
{{ #dataNodes }}
import { {{ pascal }}Component } from './{{ kebab }}/{{ kebab }}.component';
import { {{ pascal }}FormComponent } from './{{ kebab }}/{{ kebab }}-form/{{ kebab }}-form.component';
import { {{ pascal }}TableComponent } from './{{ kebab }}/{{ kebab }}-table/{{ kebab }}-table.component';
{{ /dataNodes }}

@NgModule({
  declarations: [
    AppComponent,
    {{ #dataNodes }}
    {{ pascal }}Component,
    {{ pascal }}FormComponent,
    {{ pascal }}TableComponent,
    {{ /dataNodes }}
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
`