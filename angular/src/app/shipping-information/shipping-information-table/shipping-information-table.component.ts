import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ShippingInformation } from '../shipping-information';
import { ShippingInformationService } from '../shipping-information.service';

@Component({
  selector: 'app-shipping-information-table',
  templateUrl: './shipping-information-table.component.html',
  styleUrls: ['./shipping-information-table.component.scss']
})
export class ShippingInformationTableComponent implements OnInit {
  displayedColumns = [
    'company',
    'firstName',
    'lastName',
    'address',
    'city',
    'postalCode',
  ];
  dataSource: Observable<ShippingInformation[]>;

  constructor(private service: ShippingInformationService) { }

  ngOnInit() {
    this.dataSource = this.service.observable();
  }

}
