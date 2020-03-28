import { Injectable } from '@angular/core';
import { ShippingInformation } from './shipping-information';

@Injectable({
  providedIn: 'root'
})
export class ShippingInformationService {

  private store: ShippingInformation[] = [];

  constructor() { }

  public create(data: ShippingInformation): number {
    const index = this.store.push(data) - 1;
    console.log('Shipping Information created: ' + index);
    return index;
  }

  public read(index: number) {
    return this.store[index];
  }

  public list() {
    return this.store;
  }

  public update(index: number, data: ShippingInformation) {
    this.store[index] = data;
  }

  public delete(index: number) {
    this.store.splice(index, 1);
  }
}
