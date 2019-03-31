import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { PanelArticle, article, ArticleType } from 'src/app/models/models.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-agent',
  templateUrl: './home-agent.component.html',
  styleUrls: ['./home-agent.component.scss']
})
export class HomeAgentComponent implements OnInit {
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
