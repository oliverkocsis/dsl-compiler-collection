import { ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute, UrlSegment } from '@angular/router';
import { Location } from '@angular/common';
import { FormComponent } from './data-form.component';
import { Data } from './data';

export abstract class DataComponent<D extends Data, F extends FormComponent<D>> implements OnInit {

  id: string;
  current: string;
  redirect: string;
  reference: string;
  @ViewChild('formComponent') formComponent: F;

  constructor(protected router: Router, protected route: ActivatedRoute, protected location: Location) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(`router.params: ${JSON.stringify(params)}`);
      this.id = params.id;
      this.reference = params.reference;
      this.redirect = params.redirect;
    });
    this.route.url.subscribe((urls: UrlSegment[]) => {
      this.current = urls.join('/');
      console.log(`url: ${this.current}`);
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
    if (this.redirect) {
      this.router.navigate([this.redirect, { reference: this.id }]);
    } else {
      this.location.back();
    }
  }

}