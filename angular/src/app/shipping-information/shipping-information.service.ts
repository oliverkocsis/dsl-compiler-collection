import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ShippingInformation } from './shipping-information';

@Injectable({
  providedIn: 'root'
})
export class ShippingInformationService {

  private store: ShippingInformation[];
  private subject: BehaviorSubject<ShippingInformation[]>;

  constructor() {
    this.store = [];
    this.subject = new BehaviorSubject<ShippingInformation[]>(this.store);
  }

  public create(data: ShippingInformation): number {
    const index = this.store.push(data) - 1;
    console.log('Shipping Information created: ' + index);
    this.subject.next(this.store);
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
    console.log('Shipping Information updated: ' + index);
    this.subject.next(this.store);
  }

  public delete(index: number) {
    this.store.splice(index, 1);
    console.log('Shipping Information deleted: ' + index);
    this.subject.next(this.store);
  }

  public subscribe(next: (data: ShippingInformation[]) => void): Subscription {
    return this.subject.subscribe(next);
  }
}
