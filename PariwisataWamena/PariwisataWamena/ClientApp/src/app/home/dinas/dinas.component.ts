import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../article.service';
import { PanelArticle, article, ArticleType } from 'src/app/models/models.component';

@Component({
  selector: 'app-dinas',
  templateUrl: './dinas.component.html',
  styleUrls: ['./dinas.component.scss']
})
export class DinasComponent implements OnInit {
  page: article;

  Data: PanelArticle;
  notFound: article = { title: 'Data Tidak Ditemukan' } as article;
  Datas: article[];

  constructor(private articleService: ArticleService) {
   this.articleService.getData(ArticleType.Dinas).then(x=>{
    this.Data= x;
    this.onClickProfile();
    });
  
  }

 ngOnInit() {

  }

  onClickProfile() {
    this.view("profile");
  }

  
  onClickVisiMisi() {
    this.view("visi");
  }

  
  onClickStruktur() {
    this.view("structure");
  }

  
  onClickKontak() {
    this.view("contact");
  }



  private view(data: string) {
    var selected = this.Data.datas.find(x => x.title.toLowerCase() == data.toLowerCase());
    if (selected)
      this.page = selected;
    else
      this.page = this.notFound;
  }

}
