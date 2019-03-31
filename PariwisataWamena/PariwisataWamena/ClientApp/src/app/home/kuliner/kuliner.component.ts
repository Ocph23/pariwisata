import { Component, OnInit, Inject, Input, SimpleChange } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ArticleType, PanelArticle, article } from 'src/app/models/models.component';
import { ArticleService } from '../article.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kuliner',
  templateUrl: './kuliner.component.html',
  styleUrls: ['./kuliner.component.css']
})



export class KulinerComponent implements OnInit {
  public Data: PanelArticle = { selected: null, datas: [] };
  source: article[];
  constructor(public articleService: ArticleService, private router: Router) { }

  ngOnInit() {
    this.articleService.getData(ArticleType.Kuliner).then(x => {
      this.source = x.datas.filter( x => x.status === 'publish');
      this.Data = x;
      this.Data.datas= x.datas.filter( x => x.status === 'publish');
    });
  }


  showDetail(data: article) {
    this.articleService.currentArticle = data;
    this.router.navigate(['/home/detail']);
  }


  onSearchHandle($event) {
    if ($event) {
      this.Data.datas = this.source.filter(x => x.title.includes($event) || x.content.includes($event));
    } else {
      this.Data.datas = this.source.copyWithin(this.source.length,1,this.source.length);
    }
  }

}
