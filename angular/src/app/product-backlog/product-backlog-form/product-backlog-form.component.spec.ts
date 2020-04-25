import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';

import { AppRoutingModule } from './../../app-routing.module';
import { ProductBacklogFormComponent } from './product-backlog-form.component';

describe('ProductBacklogFormComponent', () => {
  let component: ProductBacklogFormComponent;
  let fixture: ComponentFixture<ProductBacklogFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductBacklogFormComponent],
      imports: [
        AppRoutingModule,
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatButtonModule,
        MatCardModule,
        MatInputModule,
        MatRadioModule,
        MatSelectModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductBacklogFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    expect(component).toBeTruthy();
  });
});
