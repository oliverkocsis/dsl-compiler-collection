import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ProductBacklogItemService } from '../product-backlog-item.service';
import { ProductBacklogItem } from '../product-backlog-item';

@Component({
  selector: 'app-product-backlog-item-form',
  templateUrl: './product-backlog-item-form.component.html',
  styleUrls: ['./product-backlog-item-form.component.scss']
})
export class ProductBacklogItemFormComponent {
  formGroup = this.fb.group({
    name: null,
    description: null,
    order: null,
    estimate: null,
    value: null,
    completeness: null,
  });

  constructor(private fb: FormBuilder, private service: ProductBacklogItemService) { }

  onSubmit() {
    console.log(this.formGroup.value);
    const productBacklogItem = ProductBacklogItem.from(this.formGroup.value);
    this.service.create(productBacklogItem);
    this.formGroup.reset();
  }
}
