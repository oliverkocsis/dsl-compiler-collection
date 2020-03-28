import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ShippingInformationService } from '../shipping-information.service';
import { ShippingInformation } from '../shipping-information';

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

  constructor(private fb: FormBuilder, private shippingInformationService: ShippingInformationService) { }

  onSubmit() {
    console.log(this.formGroup.value);
    const shippingInformation = ShippingInformation.from(this.formGroup.value);
    this.shippingInformationService.create(shippingInformation);
    this.formGroup.reset();
  }
}
