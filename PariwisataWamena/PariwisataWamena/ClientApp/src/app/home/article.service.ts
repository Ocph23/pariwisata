import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { article, PanelArticle, ArticleType } from '../models/models.component';
import { AuthService } from '../authentification/auth.service';
import { delay } from 'q';

@Injectable({
  providedIn: 'root'
})
export class ArticleService {

  private instance = false;
  public Data: article[];
  public Kuliners: PanelArticle = null;
  public Akomodasi: PanelArticle;
  public Destinasi: PanelArticle;
  headers: { headers: HttpHeaders };
  currentArticle: article;
  Dinas: PanelArticle;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router, private auth: AuthService) {
    this.headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json; charset=utf-8'
      })
    };
    this.get();
  }

  public get() {
    return new Promise<article[]>((p, r) => {
      try {
        if (!this.instance) {
          this.http
            .get<article[]>(this.baseUrl + 'api/article', this.headers)
            .subscribe(
              result => {
                this.instance = true;
                this.Data = result;
                p(result);
              },
              error => {
                throw new Error(error);
              }
            );
        } else {
          p(this.Data);
        }
      } catch (error) {
        r(error);
      }
    });
  }

 async getData(param: ArticleType){
    let result:PanelArticle;
   await this.get().then(x=>{
      const datas = x.filter(O => O.type === param);
      result = {
        datas: datas, selected: this.GetRandomArticle(datas)
      } as PanelArticle;
    });
    return result;
  }

  async SaveArticle(model: article) {
    try {
      const token = 'Bearer ' + this.auth.getToken();
      this.headers = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'Authorization': token
        })
      };

      if (model.idarticle !== undefined && model.idarticle > 0) {
        this.http.put<article>(this.baseUrl + 'api/article/' + model.idarticle, model, this.headers)
          .subscribe(
            result => {
              console.log(result);
            },
            error => {
              throw new Error(error);

            }
          );
      } else {
        this.http
          .post<article>(this.baseUrl + 'api/article', model, this.headers)
          .subscribe(
            result => {
              console.log(result);
            },
            error => {
              throw new Error(error);
            }
          );
      }
    } catch (error) {
      console.log(error);
    }
  }

  private GetRandomArticle(datas: article[]) {
    return datas[Math.floor(Math.random() * datas.length)];
  }
}
