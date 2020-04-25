export const DATA_SERVICE_TEMPLATE = `import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { {{pascal}} } from './{{kebab}}';

@Injectable({
  providedIn: 'root'
})
export class {{pascal}}Service {

  private store: {{pascal}}[];
  private subject: BehaviorSubject<{{pascal}}[]>;

  constructor() {
    this.store = [];
    this.subject = new BehaviorSubject<{{pascal}}[]>(this.store);
  }

  public create(data: {{pascal}}): number {
    const index = this.store.push(data) - 1;
    console.log('{{name}} created: ' + index);
    this.subject.next(this.store);
    return index;
  }

  public read(index: number) {
    return this.store[index];
  }

  public list() {
    return this.store;
  }

  public update(index: number, data: {{pascal}}) {
    this.store[index] = data;
    console.log('{{name}} updated: ' + index);
    this.subject.next(this.store);
  }

  public delete(index: number) {
    this.store.splice(index, 1);
    console.log('{{name}} deleted: ' + index);
    this.subject.next(this.store);
  }

  public subscribe(next: (data: {{pascal}}[]) => void): Subscription {
    return this.subject.subscribe(next);
  }

}
`