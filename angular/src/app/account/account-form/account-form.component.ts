import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from '../account.service';
import { Account } from '../account';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit {

  formGroup = this.fb.group({
    name: null,
    parent: null,
    type: null,
    phone: null,
    website: null,
    address: this.fb.group({
      street: null,
      city: null,
      state: null,
      country: null,
      postalCode: null,
    }),
  });

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: AccountService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      console.log(id);
    });
  }

  onSubmit() {
    console.log(this.formGroup.value);
    const data = Account.from(this.formGroup.value);
    this.service.create(data);
    this.formGroup.reset();
    this.router.navigate(['/account-table'])
  }
}
