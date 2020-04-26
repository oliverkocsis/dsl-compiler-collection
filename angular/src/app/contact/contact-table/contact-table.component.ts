import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ContactService } from '../contact.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contact-table',
  templateUrl: './contact-table.component.html',
  styleUrls: ['./contact-table.component.scss']
})
export class ContactTableComponent implements OnInit {

  displayedColumns = [
    'firstName',
    'lastName',
    'jobTitle',
    'account',
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
