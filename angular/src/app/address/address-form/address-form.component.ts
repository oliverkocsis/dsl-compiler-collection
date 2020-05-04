import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataFormComponent } from 'src/app/data-form.component';
import { AddressService } from '../address.service';
import { Address } from '../address';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent extends DataFormComponent<Address, AddressService> {

  constructor(formBuilder: FormBuilder, service: AddressService) {
    super(formBuilder, service);
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      _id: null,
      street: null,
      city: null,
      state: null,
      country: null,
      postalCode: null,
    });
  }
}