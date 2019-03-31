import { Component, OnInit } from '@angular/core';
import { PanelArticle, ArticleType, article } from 'src/app/models/models.component';
import { Router } from '@angular/router';
import { ArticleService } from '../article.service';

@Component({
  selector: 'app-akomodasi',
  templateUrl: './akomodasi.component.html',
  styleUrls: ['./akomodasi.component.css']
})
export class AkomodasiComponent implements OnInit {
  public Data: PanelArticle = { selected: null, datas: [] };
  source: article[];
  constructor(public articleService: ArticleService, private router: Router) { }
  ngOnInit() {
    this.articleService.getData(ArticleType.Akomodasi).then(x => {
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
