import { Component, OnInit, ViewEncapsulation} from '@angular/core';
import { ArticleService } from '../article.service';
import { article } from 'src/app/models/models.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DetailComponent implements OnInit {
public Data:article;
  constructor(private articleService:ArticleService, private router:Router) { }

  ngOnInit() {
    if(this.articleService.currentArticle === undefined)
    {
      this.router.navigate(['/home/main']);
    }else{
      this.Data = this.articleService.currentArticle;
    }
  
  }


}
