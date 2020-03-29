import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { ShippingInformation } from './shipping-information';

@Injectable({
  providedIn: 'root'
})
export class ShippingInformationService {

  private subject = new Subject<ShippingInformation[]>();
  private store: ShippingInformation[] = [];

  constructor() { }

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

  public subscribe(next: (data: ShippingInformation[]) => void) {
    this.subject.subscribe(next);
  }

  public observable(): Observable<ShippingInformation[]> {
    return this.subject;
  }
}
