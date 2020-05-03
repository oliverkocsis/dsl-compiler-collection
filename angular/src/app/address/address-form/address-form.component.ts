import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AddressService } from '../address.service';
import { Address } from '../address';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit {

  @Input() id: string;
  @Output() data = new EventEmitter<Address>()

  formGroup = this.fb.group({
    _id: null, 
    street: null,
    city: null,
    state: null,
    country: null,
    postalCode: null,
  });

  constructor(private fb: FormBuilder, private service: AddressService) { }

  ngOnInit() {
    if (this.id) {
      const data = this.service.read(this.id);
      this.data.emit(data);
      this.formGroup.patchValue(data);
    }
  }

  submit(): Address {
    console.log(this.formGroup.value);
    let data = Address.from(this.formGroup.value);
    data = data._id ? this.service.update(data) : this.service.create(data);
    this.formGroup.reset();
    return data;
  }

}