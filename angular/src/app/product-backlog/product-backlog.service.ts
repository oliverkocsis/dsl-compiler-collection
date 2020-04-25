import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductBacklog } from './product-backlog';

@Injectable({
  providedIn: 'root'
})
export class ProductBacklogService {

  private store: ProductBacklog[];
  private subject: BehaviorSubject<ProductBacklog[]>;

  constructor() {
    this.store = [];
    this.subject = new BehaviorSubject<ProductBacklog[]>(this.store);
  }

  public create(data: ProductBacklog): number {
    const index = this.store.push(data) - 1;
    console.log('Product Backlog created: ' + index);
    this.subject.next(this.store);
    return index;
  }

  public read(index: number) {
    return this.store[index];
  }

  public list() {
    return this.store;
  }

  public update(index: number, data: ProductBacklog) {
    this.store[index] = data;
    console.log('Product Backlog updated: ' + index);
    this.subject.next(this.store);
  }

  public delete(index: number) {
    this.store.splice(index, 1);
    console.log('Product Backlog deleted: ' + index);
    this.subject.next(this.store);
  }

  public subscribe(next: (data: ProductBacklog[]) => void): Subscription {
    return this.subject.subscribe(next);
  }

}
