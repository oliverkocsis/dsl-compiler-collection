import { Component, ViewChild, OnInit } from '@angular/core';
import { AccountFormComponent } from '../account-form/account-form.component';
import { AddressFormComponent } from 'src/app/address/address-form/address-form.component';
import { Router, ActivatedRoute } from '@angular/router';
import { Account } from '../account';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @ViewChild('form') form: AccountFormComponent;
  id: string;
  @ViewChild('address') addressForm: AddressFormComponent;
  addressId: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
  }

  data(data: Account) {
    this.addressId = data.address;
  }

  submit() {
    const addressId = this.addressForm.submit()._id;
    this.form.formGroup.patchValue({ address: addressId });
    this.form.submit();
    this.router.navigate(['/account-list']);
  }
}