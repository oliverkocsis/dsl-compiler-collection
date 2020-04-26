import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/contact/contact.service';
import { Contact } from 'src/app/contact/contact';


@Component({
  selector: 'app-account-form-contact-form',
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

  constructor(private fb: FormBuilder, private router: Router, private route: ActivatedRoute, private service: ContactService) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      const id = params['id'];
      console.log(id);
    });
  }

  onSubmit() {
    console.log(this.formGroup.value);
    const data = Contact.from(this.formGroup.value);
    this.service.create(data);
    this.formGroup.reset();
    this.router.navigate(['/account-form'])
  }

}
