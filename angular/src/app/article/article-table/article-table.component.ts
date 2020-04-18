import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-table',
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.scss']
})
export class ArticleTableComponent implements OnInit, OnDestroy {
  displayedColumns = [
    'title',
    'content',
    'author',
  ];
  dataSource: MatTableDataSource<Article>;
  subscription: Subscription;

  constructor(private service: ArticleService) { }

  ngOnInit() {
    this.dataSource = new MatTableDataSource<Article>();
    this.subscription = this.service.subscribe((data: Article[]) => {
      this.dataSource.data = data;
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
