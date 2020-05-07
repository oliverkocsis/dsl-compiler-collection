import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Contact } from '../contact';
import { FormArray, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AccountService } from 'src/app/account/account.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent implements OnInit, OnDestroy {

  displayedColumns = [
    'firstName',
    'lastName',
    'jobTitle',
    'phone',
    'email',
  ];
  dataSource: Contact[];
  subscription: Subscription;

  constructor(private router: Router, private route: ActivatedRoute, private service: AccountService) { }

  ngOnInit() {
    this.subscription = this.service.subscribeForm((form: FormGroup) => {
      this.dataSource = (form.get('contacts') as FormArray).value as Contact[];
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  edit(id: string) {
    this.router.navigate(['contact/edit', id], { relativeTo: this.route })
  }


}