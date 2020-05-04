import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ContactFormComponent } from '../contact-form/contact-form.component';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @ViewChild('form') form: ContactFormComponent;
  id: string;

  constructor(private location: Location, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = params.id;
    });
  }

  data(data: Contact) {
  }

  submit() {
    this.form.submit();
    this.location.back();
  }

}