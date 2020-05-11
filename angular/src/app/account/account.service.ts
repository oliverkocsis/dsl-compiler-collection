import { Injectable } from '@angular/core';
import { Account } from './account';
import { Subscription, BehaviorSubject, Observable } from 'rxjs';
import { FormGroup, FormBuilder, FormArray } from '@angular/forms';
import { Contact } from '../contact/contact';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private store: Map<string, Account>;
  private storeSubject: BehaviorSubject<Account[]>;
  private form: FormGroup;
  private formSubject: BehaviorSubject<FormGroup>;

  constructor(private formBuilder: FormBuilder) {
    this.store = new Map<string, Account>();
    this.storeSubject = new BehaviorSubject<Account[]>(Array.from(this.store.values()));
    this.form = this.emptyForm();
    this.formSubject = new BehaviorSubject<FormGroup>(this.form);
  }

  private emptyForm(): FormGroup {
    return this.formBuilder.group({
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
  }

  public onList() {
    if (this.store.size === 0) {
      for (const sample of SAMPLES) {
        this.create(sample);
      }
    }
  }

  public onEdit(id: string): Observable<FormGroup> {
    this.form = this.emptyForm();
    this.formSubject.next(this.form);
    if (id) {
      this.read(id).then((entity: Account) => {
        if (entity) {
          this.form.patchValue(entity);
          const array = this.form.get('contacts') as FormArray;
          for (const object of entity.contacts) {
            array.push(this.formBuilder.group({
              firstName: object.firstName,
              lastName: object.lastName,
              jobTitle: object.jobTitle,
              phone: object.phone,
              email: object.email,
            }))
          }
          console.log(this.form.value);
          this.formSubject.next(this.form);
        } else {
          const msg = `entity does not exist: ${id}`;
          console.warn(msg);
          throw new Error(msg);
        }
      });
    }
    return this.formSubject;
  }

  public onSave() {
    const entity = this.form.value as Account;
    entity.$$id ? this.update(entity) : this.create(entity)
  }

  public subscribeStore(next: (entity: Account[]) => void): Subscription {
    return this.storeSubject.subscribe(next);
  }

  public subscribeForm(next: (form: FormGroup) => void): Subscription {
    return this.formSubject.subscribe(next);
  }


  public create(entity: Account): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
      setTimeout(() => {
        entity.$$id = Date.now().toString();
        this.store.set(entity.$$id, entity);
        console.log(`entity created: ${JSON.stringify(entity)}`);
        this.storeSubject.next(Array.from(this.store.values()));
        resolve(entity);
      }, 1000);
    });
  }

  public read(id: string): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
      setTimeout(() => {
        resolve(this.store.get(id));
      }, 1000);
    });
  }

  public list(): Promise<Account[]> {
    return new Promise<Account[]>((resolve, reject) => {
      setTimeout(() => {
        resolve(Array.from(this.store.values()));
      }, 1000);
    });
  }

  public update(entity: Account): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
      setTimeout(() => {
        this.store.set(entity.$$id, entity);
        console.log(`entity updated: ${JSON.stringify(entity)}`);
        this.storeSubject.next(Array.from(this.store.values()));
        resolve(entity);
      }, 1000);
    });
  }

  public delete(id: string): Promise<Account> {
    return new Promise<Account>((resolve, reject) => {
      setTimeout(() => {
        const entity = this.store.get(id);
        this.store.delete(id);
        console.log(`entity deleted: ${entity.$$id}`);
        this.storeSubject.next(Array.from(this.store.values()));
        resolve(entity);
      }, 1000);
    });
  }
}

const SAMPLES: Account[] = [{
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
}, {
  name: 'DSL-CC',
  phone: '+36 (1) 234-5678',
  website: 'dsl-cc.app',
  address: {
    street: 'Bécsi út 1',
    city: 'Budapest',
    country: 'Hungary',
    postalCode: '1021'
  },
  contacts: [
    {
      firstName: 'James',
      lastName: 'Bond',
      jobTitle: 'CEO',
      email: 'john.smith@mohio.app',
      phone: '+36 (70) 123-3456',
    },
    {
      firstName: 'Super',
      lastName: 'Girl',
      jobTitle: 'CFO',
      email: 'jane.doe@mohio.app',
      phone: '+36 (30) 987-6543',
    }
  ]
}]