import { Component, OnInit, Input } from '@angular/core';
import { Contact } from '../contact';
import { FormArray } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent implements OnInit {

  @Input() form: FormArray;
  displayedColumns = [
    'firstName',
    'lastName',
    'jobTitle',
    'phone',
    'email',
  ];
  dataSource: Contact[];

  constructor(private router: Router) { }

  ngOnInit() {
    this.dataSource = this.form.value as Contact[];
  }

}