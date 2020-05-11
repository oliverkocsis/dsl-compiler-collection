import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataFormComponent } from 'src/app/data-form.component';
import { AccountService } from '../account.service';
import { Account } from '../account';
import { ActivatedRoute, Params, ActivatedRouteSnapshot } from '@angular/router';
import { Subscription, Observable } from 'rxjs';

@Component({
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.scss']
})
export class AccountFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscription: Subscription

  constructor(private route: ActivatedRoute, private service: AccountService) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      const id = params.id;
      this.subscription = this.service.onEdit(id).subscribe((form: FormGroup) => {
        this.form = form;
      }, (error: any) => {
        console.error(error);
      });
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}