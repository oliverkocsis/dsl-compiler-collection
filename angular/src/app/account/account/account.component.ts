import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataComponent } from 'src/app/data.component';
import { Account } from '../account';
import { AccountFormComponent } from '../account-form/account-form.component';
import { AddressFormComponent } from '../../address/address-form/address-form.component';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent extends DataComponent<Account, AccountFormComponent> {

  @ViewChild('addressFormComponent') addressFormComponent: AddressFormComponent;

  constructor(router: Router, route: ActivatedRoute, location: Location) {
    super(router, route, location);
  }

  getRouterLink(): string { return '/account' }

  saveNestedForms() {
    this.formComponent.formGroup.patchValue({ address: this.addressFormComponent.submit()._id });
  }
}