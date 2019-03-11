import { Component, OnInit} from '@angular/core';
import { Article } from 'src/app/models/models.component';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
public Data:Article;
  constructor(private articleService:ArticleService) { }

  ngOnInit() {
    this.Data = this.articleService.currentArticle;
  }


}
