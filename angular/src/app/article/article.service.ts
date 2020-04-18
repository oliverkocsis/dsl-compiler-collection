import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Article } from './article';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private subject = new Subject<Article[]>();
  private store: Article[] = [];

  constructor() { }

  public create(data: Article): number {
    const index = this.store.push(data) - 1;
    console.log('Article created: ' + index);
    this.subject.next(this.store);
    return index;
  }

  public read(index: number) {
    return this.store[index];
  }

  public list() {
    return this.store;
  }

  public update(index: number, data: Article) {
    this.store[index] = data;
    console.log('Article updated: ' + index);
    this.subject.next(this.store);
  }

  public delete(index: number) {
    this.store.splice(index, 1);
    console.log('Article deleted: ' + index);
    this.subject.next(this.store);
  }

  public subscribe(next: (data: Article[]) => void) {
    this.subject.subscribe(next);
  }

  public observable(): Observable<Article[]> {
    return this.subject;
  }
}
