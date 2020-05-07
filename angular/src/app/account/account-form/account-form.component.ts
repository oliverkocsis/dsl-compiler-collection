import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataFormComponent } from 'src/app/data-form.component';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscription: Subscription;

  constructor(private service: AccountService) { }

  ngOnInit() {
    this.subscription = this.service.subscribeForm((form: FormGroup) => {
      this.form = form;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}