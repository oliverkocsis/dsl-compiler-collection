import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Address } from '../address';
import { AddressService } from '../address.service';

@Component({
  selector: 'app-address-table',
  templateUrl: './address-table.component.html',
  styleUrls: ['./address-table.component.scss']
})
export class AddressTableComponent implements OnInit, OnDestroy {
  
  displayedColumns = [
    'street', 
    'city', 
    'state', 
    'country', 
    'postalCode', 
  ];
  dataSource: MatTableDataSource<Address>;
  subscription: Subscription;

  constructor(public router: Router, private service: AddressService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Address>();
    this.subscription = this.service.subscribe((data: Address[]) => {
      this.dataSource.data = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}