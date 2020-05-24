import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-shipping-address',
  templateUrl: './shipping-address.component.html',
  styleUrls: ['./shipping-address.component.scss']
})
export class ShippingAddressComponent {
  form = this.fb.group({
    
    street: null,
    
    city: null,
    
    postalCode: null,
    
  });

  constructor(private fb: FormBuilder) {}

  submit() {
    console.log(this.form.value);
    alert('Thanks!');
  }
}
