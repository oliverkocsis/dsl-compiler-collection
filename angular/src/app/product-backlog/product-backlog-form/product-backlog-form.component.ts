import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductBacklogService } from '../product-backlog.service';
import { ProductBacklog } from '../product-backlog';

@Component({
  selector: 'app-product-backlog-form',
  templateUrl: './product-backlog-form.component.html',
  styleUrls: ['./product-backlog-form.component.scss']
})
export class ProductBacklogFormComponent implements OnInit {
  formGroup = this.fb.group({
    name: null,
  });

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: ProductBacklogService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      console.log(id);
    });
  }

  onSubmit() {
    console.log(this.formGroup.value);
    const productBacklog = ProductBacklog.from(this.formGroup.value);
    this.service.create(productBacklog);
    this.formGroup.reset();
    this.router.navigate(['/product-backlog-table'])
  }
}
