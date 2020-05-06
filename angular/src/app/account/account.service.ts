import { Injectable } from '@angular/core';
import { Account } from './account';
import { Subscription, BehaviorSubject } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Contact } from '../contact/contact';

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
      $$id: null,
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
    this.create(SAMPLE);
  }

  public edit(id: string): FormGroup {
    if (id) {
      const entity = this.read(id)
      if (entity) {
        this.form.patchValue(entity);
        this.form.setControl('contacts',
          this.formBuilder.array(
            entity.contacts.map((object: Contact) => this.formBuilder.group({
              firstName: object.firstName,
              lastName: object.lastName,
              jobTitle: object.jobTitle,
              phone: object.phone,
              email: object.email,
            }))));
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
    return entity.$$id ? this.update(entity) : this.create(entity);
  }

  public create(entity: Account): Account {
    entity.$$id = Date.now().toString();
    this.store.set(entity.$$id, entity);
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
    this.store.set(entity.$$id, entity);
    console.log(`entity updated: ${JSON.stringify(entity)}`);
    this.subject.next(Array.from(this.store.values()));
    return entity;
  }

  public delete(id: string) {
    const entity = this.store.get(id);
    this.store.delete(id);
    console.log(`entity deleted: ${entity.$$id}`);
    this.subject.next(Array.from(this.store.values()));
  }

  public subscribe(next: (entity: Account[]) => void): Subscription {
    return this.subject.subscribe(next);
  }
}

const SAMPLE: Account = {
  name: 'Mohio',
  phone: '+36 (1) 234-5678',
  website: 'mohio.app',
  address: {
    street: 'Váci utca 1',
    city: 'Budapest',
    country: 'Hungary',
    postalCode: '1051'
  },
  contacts: [
    {
      firstName: 'John',
      lastName: 'Smith',
      jobTitle: 'CEO',
      email: 'john.smith@mohio.app',
      phone: '+36 (70) 123-3456',
    },
    {
      firstName: 'Jane',
      lastName: 'Doe',
      jobTitle: 'CFO',
      email: 'jane.doe@mohio.app',
      phone: '+36 (30) 987-6543',
    }
  ]
}