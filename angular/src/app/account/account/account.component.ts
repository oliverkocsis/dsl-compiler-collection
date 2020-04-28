import { Component, ViewChild, OnInit } from '@angular/core';
import { AccountFormComponent } from '../account-form/account-form.component';
import { AddressFormComponent } from 'src/app/address/address-form/address-form.component';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { Account } from '../account';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  @ViewChild('_this') _this: AccountFormComponent;
  _id: string;
  @ViewChild('address') address: AddressFormComponent;
  addressId: string;

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this._id = params['id'];
    });
  }

  data(data: Account) {
    this.addressId = data.address;
  }

  submit() {
    const addressId = this.address.submit()._id;
    this._this.formGroup.patchValue({ address: addressId });
    this._this.submit();
    this.router.navigate(['/account-list'])
  }
}
