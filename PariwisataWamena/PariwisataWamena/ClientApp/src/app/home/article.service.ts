import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Article, ArticleType, PanelArticle } from '../models/models.component';


@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  private instance = false;
  public Data: Article[];
  public Kuliners: PanelArticle;
  public Akomodasi: PanelArticle;
  public Destinasi: PanelArticle;

  headers: { headers: HttpHeaders; };
  currentArticle: Article;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router) {
    this.headers = { headers: new HttpHeaders({ 'Content-Type': 'application/json; charset=utf-8' }) };
  }

  public async get() {
    try {
      if (!this.instance) {
        this.http.get<Article[]>('https://localhost:5001/api/Kuliner/Get', this.headers)
          .subscribe(result => {
            this.Data = result;
            const kuliners = this.Data.filter(O => O.type === ArticleType.Kuliner);
            this.Kuliners = { 'datas': kuliners, 'selected': this.GetRandomArticle(kuliners) };

            const akomodasi = this.Data.filter(O => O.type === ArticleType.Akomodasi);
            this.Akomodasi = { 'datas': akomodasi, 'selected': this.GetRandomArticle(akomodasi) };

            const destination = this.Data.filter(O => O.type === ArticleType.Destinasi);
            this.Destinasi = { 'datas': destination, 'selected': this.GetRandomArticle(destination) };
          }, error => { throw new Error(error); });
      }
    } catch (error) {
      console.log(error);
    }
  }

  private GetRandomArticle(datas: Article[]) {
    return datas[Math.floor(Math.random() * datas.length)];
  }
}
