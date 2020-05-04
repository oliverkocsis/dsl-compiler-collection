import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataFormComponent } from 'src/app/data-form.component';
import { AccountService } from '../account.service';
import { Account } from '../account';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent extends DataFormComponent<Account, AccountService> {

  constructor(formBuilder: FormBuilder, service: AccountService) {
    super(formBuilder, service);
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      _id: null,
      name: null,
      phone: null,
      website: null,
      address: null,
    });
  }
}