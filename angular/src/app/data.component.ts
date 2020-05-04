import { ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormComponent } from './data-form.component';
import { Data } from './data';

export abstract class DataComponent<D extends Data, F extends FormComponent<D>> implements OnInit {

  id: string;
  redirect: string[];
  @ViewChild('formComponent') formComponent: F;

  constructor(protected router: Router, protected route: ActivatedRoute, protected location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(`Router.params: ${JSON.stringify(params)}`);
      this.id = params.id;
    });
  }

  protected abstract getRouterLink(): string;

  protected saveNestedForms() { };

  save() {
    this.saveNestedForms()
    this.id = this.formComponent.submit()._id;
    this.router.navigate([this.getRouterLink(), 'edit', this.id]);
  }

  saveClose() {
    this.save();
    this.location.back();
  }

}