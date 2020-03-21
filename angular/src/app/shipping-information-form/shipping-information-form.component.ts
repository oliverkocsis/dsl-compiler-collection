import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-information-form',
  templateUrl: './shipping-information-form.component.html',
  styleUrls: ['./shipping-information-form.component.scss']
})
export class ShippingInformationFormComponent {
  formGroup = this.fb.group({
    company: null,
    firstName: null,
    lastName: null,
    address: null,
    city: null,
    postalCode: null,
  });

  constructor(private fb: FormBuilder) { }

  onSubmit() {
    console.log(this.formGroup.value);
  }
}
