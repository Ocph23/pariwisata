import { Component, OnInit} from '@angular/core';
import { ArticleService } from '../article.service';
import { article } from 'src/app/models/models.component';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
public Data:article;
  constructor(private articleService:ArticleService) { }

  ngOnInit() {
    this.Data = this.articleService.currentArticle;
  }


}
