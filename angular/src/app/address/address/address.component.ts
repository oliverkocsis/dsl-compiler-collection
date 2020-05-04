import { Component, ViewChild, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataComponent } from 'src/app/data.component';
import { Address } from '../address';
import { AddressFormComponent } from '../address-form/address-form.component';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent extends DataComponent<Address, AddressFormComponent> {

  constructor(router: Router, route: ActivatedRoute, location: Location) {
    super(router, route, location);
  }

  getRouterLink(): string { return '/address' }
}