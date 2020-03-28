export const ANGULAR_SERVICE_TEMPLATE = `import { Injectable } from '@angular/core';
import { {{pascal}} } from './{{kebab}}';

@Injectable({
  providedIn: 'root'
})
export class {{pascal}}Service {

  private store: {{pascal}}[] = [];

  constructor() { }

  public create(data: {{pascal}}): number {
    const index = this.store.push(data) - 1;
    console.log('{{name}} created: ' + index);
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
  }

  public delete(index: number) {
    this.store.splice(index, 1);
  }
}

`