import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private store: Contact[];
  private subject: BehaviorSubject<Contact[]>;

  constructor() {
    this.store = [];
    this.subject = new BehaviorSubject<Contact[]>(this.store);
  }

  public create(data: Contact): number {
    const index = this.store.push(data) - 1;
    console.log('Contact created: ' + index);
    this.subject.next(this.store);
    return index;
  }

  public read(index: number) {
    return this.store[index];
  }

  public list() {
    return this.store;
  }

  public update(index: number, data: Contact) {
    this.store[index] = data;
    console.log('Contact updated: ' + index);
    this.subject.next(this.store);
  }

  public delete(index: number) {
    this.store.splice(index, 1);
    console.log('Contact deleted: ' + index);
    this.subject.next(this.store);
  }

  public subscribe(next: (data: Contact[]) => void): Subscription {
    return this.subject.subscribe(next);
  }

}
