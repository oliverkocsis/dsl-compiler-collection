import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { ShippingInformation } from '../shipping-information';
import { ShippingInformationService } from '../shipping-information.service';

@Component({
  selector: 'app-shipping-information-table',
  templateUrl: './shipping-information-table.component.html',
  styleUrls: ['./shipping-information-table.component.scss']
})
export class ShippingInformationTableComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'company', 
    'firstName', 
    'lastName', 
    'address', 
    'city', 
    'postalCode', 
  ];
  dataSource: MatTableDataSource<ShippingInformation>;
  subscription: Subscription;

  constructor(private service: ShippingInformationService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<ShippingInformation>();
    this.subscription = this.service.subscribe((data: ShippingInformation[]) => {
      this.dataSource.data = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
