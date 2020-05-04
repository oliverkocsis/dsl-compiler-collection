import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { DataFormComponent } from 'src/app/data-form.component';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent extends DataFormComponent<Contact, ContactService> {

  constructor(formBuilder: FormBuilder, service: ContactService) {
    super(formBuilder, service);
  }

  buildForm(): FormGroup {
    return this.formBuilder.group({
      _id: null,
      firstName: null,
      lastName: null,
      jobTitle: null,
      phone: null,
      email: null,
    });
  }
}