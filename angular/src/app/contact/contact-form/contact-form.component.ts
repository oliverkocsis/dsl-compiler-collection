import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit, OnDestroy {

  form: FormGroup;
  subscription: Subscription;

  constructor(private route: ActivatedRoute, private service: AccountService) { }

  ngOnInit() {
    console.log(this.route.snapshot.params);
    const id = this.route.snapshot.params.contactId;
    this.subscription = this.service.subscribeForm((form: FormGroup) => {
      this.form = (form.get('contacts') as FormArray).at(id) as FormGroup;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}