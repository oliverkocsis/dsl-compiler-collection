import { Component, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DataComponent } from 'src/app/data.component';
import { Contact } from '../contact';
import { ContactFormComponent } from '../contact-form/contact-form.component';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent extends DataComponent<Contact, ContactFormComponent> {

  constructor(router: Router, route: ActivatedRoute, location: Location) {
    super(router, route, location);
  }

  getRouterLink(): string { return '/contact' }
}