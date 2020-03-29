export const ANGULAR_SERVICE_TEMPLATE = `import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { {{pascal}} } from './{{kebab}}';

@Injectable({
  providedIn: 'root'
})
export class {{pascal}}Service {

  private subject = new Subject<ShippingInformation[]>();
  private store: {{pascal}}[] = [];

  constructor() { }

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

  public subscribe(next: (data: {{pascal}}[]) => void) {
    this.subject.subscribe(next);
  }

  public observable(): Observable<{{pascal}}[]> {
    return this.subject;
  }
}

`