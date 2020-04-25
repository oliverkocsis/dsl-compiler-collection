import { Injectable } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { ProductBacklogItem } from './product-backlog-item';

@Injectable({
  providedIn: 'root'
})
export class ProductBacklogItemService {

  private store: ProductBacklogItem[];
  private subject: BehaviorSubject<ProductBacklogItem[]>;

  constructor() {
    this.store = [];
    this.subject = new BehaviorSubject<ProductBacklogItem[]>(this.store);
  }

  public create(data: ProductBacklogItem): number {
    const index = this.store.push(data) - 1;
    console.log('Product Backlog Item created: ' + index);
    this.subject.next(this.store);
    return index;
  }

  public read(index: number) {
    return this.store[index];
  }

  public list() {
    return this.store;
  }

  public update(index: number, data: ProductBacklogItem) {
    this.store[index] = data;
    console.log('Product Backlog Item updated: ' + index);
    this.subject.next(this.store);
  }

  public delete(index: number) {
    this.store.splice(index, 1);
    console.log('Product Backlog Item deleted: ' + index);
    this.subject.next(this.store);
  }

  public subscribe(next: (data: ProductBacklogItem[]) => void): Subscription {
    return this.subject.subscribe(next);
  }

}
