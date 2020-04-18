import { Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ArticleService } from '../article.service';
import { Article } from '../article';

@Component({
  selector: 'app-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent {
  formGroup = this.fb.group({
    title: null,
    content: null,
    author: null,
  });

  constructor(private fb: FormBuilder, private service: ArticleService) { }

  onSubmit() {
    console.log(this.formGroup.value);
    const article = Article.from(this.formGroup.value);
    this.service.create(article);
    this.formGroup.reset();
  }
}
