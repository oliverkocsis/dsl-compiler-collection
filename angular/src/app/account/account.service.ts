import { Injectable } from '@angular/core';
import { Account } from './account';
import { Subscription, BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private store: Map<string, Account>;
  private subject: BehaviorSubject<Account[]>;
  private form: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.store = new Map<string, Account>();
    this.subject = new BehaviorSubject<Account[]>(Array.from(this.store.values()));
    this.form = this.formBuilder.group({
      _id: null,
      name: null,
      phone: null,
      website: null,
      address: this.formBuilder.group({
        street: null,
        city: null,
        state: null,
        country: null,
        postalCode: null,
      }),
      contacts: this.formBuilder.array([]),
    });
  }

  public edit(id: string): FormGroup {
    if (id) {
      const entity = this.read(id)
      if (entity) {
        this.form.patchValue(entity);
      }
      else {
        const msg = `entity does not exist: ${id}`;
        console.warn(msg);
        throw new Error(msg);
      }
    } else {
      this.form.reset();
    }
    return this.form;
  }

  public save(): Account {
    const entity = this.form.value as Account;
    return entity._id ? this.update(entity) : this.create(entity);
  }

  public create(entity: Account): Account {
    entity._id = Date.now().toString();
    this.store.set(entity._id, entity);
    console.log(`entity created: ${JSON.stringify(entity)}`);
    this.subject.next(Array.from(this.store.values()));
    return entity;
  }

  public read(id: string): Account {
    return this.store.get(id);
  }

  public list(): Account[] {
    return Array.from(this.store.values());
  }

  public update(entity: Account): Account {
    this.store.set(entity._id, entity);
    console.log(`entity updated: ${JSON.stringify(entity)}`);
    this.subject.next(Array.from(this.store.values()));
    return entity;
  }

  public delete(id: string) {
    const entity = this.store.get(id);
    this.store.delete(id);
    console.log(`entity deleted: ${entity._id}`);
    this.subject.next(Array.from(this.store.values()));
  }

  public subscribe(next: (entity: Account[]) => void): Subscription {
    return this.subject.subscribe(next);
  }
}