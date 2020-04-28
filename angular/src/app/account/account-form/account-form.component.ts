import { Component, OnInit, ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AccountService } from '../account.service';
import { Account } from '../account';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {

  @Input() id: string;
  @Output() data = new EventEmitter<Account>()

  formGroup = this.fb.group({
    _id: null,
    name: null,
    parent: null,
    type: null,
    phone: null,
    website: null,
    address: null,
  });

  constructor(private fb: FormBuilder, private service: AccountService) { }

  ngOnInit() {
    if (this.id) {
      const data = this.service.read(this.id);
      this.data.emit(data);
      this.formGroup.patchValue(data);
    }
  }

  submit(): Account {
    console.log(this.formGroup.value);
    let data = Account.from(this.formGroup.value);
    data = data._id ? this.service.update(data) : this.service.create(data);
    this.formGroup.reset();
    return data;
  }

}