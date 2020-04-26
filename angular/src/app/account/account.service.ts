import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { Account } from './account';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private store: Account[];
  private subject: BehaviorSubject<Account[]>;

  constructor() {
    this.store = [];
    this.subject = new BehaviorSubject<Account[]>(this.store);
  }

  public create(data: Account): number {
    const index = this.store.push(data) - 1;
    console.log('Account created: ' + index);
    this.subject.next(this.store);
    return index;
  }

  public read(index: number) {
    return this.store[index];
  }

  public list() {
    return this.store;
  }

  public update(index: number, data: Account) {
    this.store[index] = data;
    console.log('Account updated: ' + index);
    this.subject.next(this.store);
  }

  public delete(index: number) {
    this.store.splice(index, 1);
    console.log('Account deleted: ' + index);
    this.subject.next(this.store);
  }

  public subscribe(next: (data: Account[]) => void): Subscription {
    return this.subject.subscribe(next);
  }

}
