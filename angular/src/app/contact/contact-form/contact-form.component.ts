import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent implements OnInit {

  @Input() id: string;
  @Output() data = new EventEmitter<Contact>()

  formGroup = this.fb.group({
    _id: null, 
    firstName: null,
    lastName: null,
    jobTitle: null,
    phone: null,
    email: null,
  });

  constructor(private fb: FormBuilder, private service: ContactService) { }

  ngOnInit() {
    if (this.id) {
      const data = this.service.read(this.id);
      this.data.emit(data);
      this.formGroup.patchValue(data);
    }
  }

  submit(): Contact {
    console.log(this.formGroup.value);
    let data = Contact.from(this.formGroup.value);
    data = data._id ? this.service.update(data) : this.service.create(data);
    this.formGroup.reset();
    return data;
  }

}