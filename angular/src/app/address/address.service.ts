import { Injectable } from '@angular/core';
import { DataService } from 'src/app/data.service';
import { Address } from './address';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends DataService<Address> { }