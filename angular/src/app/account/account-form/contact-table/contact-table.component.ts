import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ContactService } from 'src/app/contact/contact.service';
import { Contact } from 'src/app/contact/contact';

@Component({
  selector: 'app-account-form-contact-table',
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
  dataSource: MatTableDataSource<Contact>;
  subscription: Subscription;

  constructor(private service: ContactService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Contact>();
    this.subscription = this.service.subscribe((data: Contact[]) => {
      this.dataSource.data = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
