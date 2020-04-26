import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';
import { AccountService } from 'src/app/account/account.service';
import { Account } from 'src/app/account/account';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  formGroup = this.fb.group({
    firstName: null,
    lastName: null,
    jobTitle: null,
    account: null,
    phone: null,
    email: null,
  });

  public accountOptions: Account[];

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: ContactService, private accountService: AccountService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      console.log(id);
    });
    this.accountService.subscribe((data: Account[]) => this.accountOptions = data);
  }

  onSubmit() {
    console.log(this.formGroup.value);
    const data = Contact.from(this.formGroup.value);
    this.service.create(data);
    this.formGroup.reset();
    this.router.navigate(['/contact-table'])
  }

}
