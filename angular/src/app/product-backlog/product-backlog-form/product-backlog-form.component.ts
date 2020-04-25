import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductBacklogService } from '../product-backlog.service';
import { ProductBacklog } from '../product-backlog';

@Component({
  selector: 'app-product-backlog-form',
  templateUrl: './product-backlog-form.component.html',
  styleUrls: ['./product-backlog-form.component.scss']
})
export class ProductBacklogFormComponent {
  formGroup = this.fb.group({
    name: null,
  });

  constructor(private fb: FormBuilder, private service: ProductBacklogService) { }

  onSubmit() {
    console.log(this.formGroup.value);
    const productBacklog = ProductBacklog.from(this.formGroup.value);
    this.service.create(productBacklog);
    this.formGroup.reset();
  }
}
