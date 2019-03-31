import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../authentification/auth.service';
import { article, PanelArticle } from '../models/models.component';
import { ArticleService } from '../home/article.service';

@Injectable({
  providedIn: 'root'
})
export class DinasDataService {
  private Data: PanelArticle;
  public Selected: article;
  private headers = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  };
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private dinasService: ArticleService,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    dinasService.get();
    this.Data = dinasService.Dinas;
  }

  public getContent(title: string) {
    this.Selected = null;
    this.Selected = this.Data.datas.find(x => x.title.toUpperCase() === title.toUpperCase());
  }

  public publish(data: article) {
    this.dinasService.SaveArticle(data).subscribe(x => {
      console.log('saved');

    }, error => {console.log(error); });
  }

  public saveDraf(data: article) {


  }








}
