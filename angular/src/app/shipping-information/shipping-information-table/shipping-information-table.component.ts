import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ShippingInformationService } from '../shipping-information.service';
import { Observable } from 'rxjs';
import { ShippingInformation } from '../shipping-information';

@Component({
  selector: 'app-shipping-information-table',
  templateUrl: './shipping-information-table.component.html',
  styleUrls: ['./shipping-information-table.component.scss']
})
export class ShippingInformationTableComponent implements OnInit {
  displayedColumns = ['company', 'firstName', 'lastName', 'address', 'city', 'postalCode'];
  dataSource: Observable<ShippingInformation[]>;

  constructor(private service: ShippingInformationService) { }

  ngOnInit() {
    this.dataSource = this.service.observable();
  }

}
