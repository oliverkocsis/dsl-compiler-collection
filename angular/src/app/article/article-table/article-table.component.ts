import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Article } from '../article';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-article-table',
  templateUrl: './article-table.component.html',
  styleUrls: ['./article-table.component.scss']
})
export class ArticleTableComponent implements OnInit {
  displayedColumns = [
    'title',
    'content',
    'author',
  ];
  dataSource: Observable<Article[]>;

  constructor(private service: ArticleService) { }

  ngOnInit() {
    this.dataSource = this.service.observable();
  }

}
