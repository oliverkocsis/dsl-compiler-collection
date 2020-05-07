import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-address-form',
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.scss']
})
export class AddressFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscription: Subscription;

  constructor(private service: AccountService) { }

  ngOnInit() {
    this.subscription = this.service.subscribeForm((form: FormGroup) => {
      this.form = form.get('address') as FormGroup;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}