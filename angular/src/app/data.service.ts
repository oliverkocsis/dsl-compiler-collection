import { BehaviorSubject, Subscription } from 'rxjs';
import { Data } from './data';

export abstract class DataService<T extends Data> {
  private store: Map<string, T>;
  private subject: BehaviorSubject<T[]>;

  constructor() {
    this.store = new Map<string, T>();
    this.subject = new BehaviorSubject<T[]>(Array.from(this.store.values()));
  }

  public create(data: T): T {
    data._id = Date.now().toString();
    this.store.set(data._id, data);
    console.log(`${typeof data} created: ${data._id}`);
    this.subject.next(Array.from(this.store.values()));
    return data;
  }

  public read(id: string): T {
    return this.store.get(id);
  }

  public list(): T[] {
    return Array.from(this.store.values());
  }

  public update(data: T): T {
    this.store.set(data._id, data);
    console.log(`${typeof data} updated: ${data._id}`);
    this.subject.next(Array.from(this.store.values()));
    return data;
  }

  public delete(id: string) {
    const data = this.store.get(id);
    this.store.delete(id);
    console.log(`${typeof data} deleted: ${data._id}`);
    this.subject.next(Array.from(this.store.values()));
  }

  public subscribe(next: (data: T[]) => void): Subscription {
    return this.subject.subscribe(next);
  }
}