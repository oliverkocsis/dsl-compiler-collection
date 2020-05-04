import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Contact } from '../contact';
import { ContactService } from '../contact.service';

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
  dataSource: MatTableDataSource<Contact>;
  subscription: Subscription;

  constructor(public router: Router, private service: ContactService) { }

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