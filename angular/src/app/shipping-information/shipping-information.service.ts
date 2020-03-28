import { Injectable } from '@angular/core';
import { ShippingInformation } from './shipping-information';

@Injectable({
  providedIn: 'root'
})
export class ShippingInformationService {

  private store: ShippingInformation[] = [];

  constructor() { }

  public create(shippingInformation: ShippingInformation): number {
    const index = this.store.push(shippingInformation) - 1;
    console.log(`ShippingInformation created: ${index}`);
    return index;
  }

  public read(index: number) {
    return this.store[index];
  }

  public list() {
    return this.store;
  }

  public update(index: number, shippingInformation: ShippingInformation) {
    this.store[index] = shippingInformation;
  }

  public delete(index: number) {
    this.store.splice(index, 1);
  }
}
