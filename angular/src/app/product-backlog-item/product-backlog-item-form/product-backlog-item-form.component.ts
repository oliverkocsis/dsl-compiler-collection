import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductBacklogItemService } from '../product-backlog-item.service';
import { ProductBacklogItem } from '../product-backlog-item';

@Component({
  selector: 'app-product-backlog-item-form',
  templateUrl: './product-backlog-item-form.component.html',
  styleUrls: ['./product-backlog-item-form.component.scss']
})
export class ProductBacklogItemFormComponent implements OnInit {

  formGroup = this.fb.group({
    name: null,
    description: null,
    order: null,
    estimate: null,
    value: null,
    completeness: null,
  });

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: ProductBacklogItemService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      console.log(id);
    });
  }

  onSubmit() {
    console.log(this.formGroup.value);
    const productBacklogItem = ProductBacklogItem.from(this.formGroup.value);
    this.service.create(productBacklogItem);
    this.formGroup.reset();
    this.router.navigate(['/product-backlog-item-table'])
  }
}
