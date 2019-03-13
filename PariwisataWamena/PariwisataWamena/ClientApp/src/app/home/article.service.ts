import { Injectable, Inject } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Router } from "@angular/router";
import { article, PanelArticle, ArticleType } from "../models/models.component";

@Injectable({
  providedIn: "root"
})
export class ArticleService {
  private instance = false;
  public Data: article[];
  public Kuliners: PanelArticle;
  public Akomodasi: PanelArticle;
  public Destinasi: PanelArticle;

  headers: { headers: HttpHeaders };
  currentArticle: article;
  Dinas: PanelArticle;

  private path: string = "https://localhost:5001";

  constructor(
    private http: HttpClient,
    @Inject("BASE_URL") private baseUrl: string,
    private router: Router
  ) {
    this.headers = {
      headers: new HttpHeaders({
        "Content-Type": "application/json; charset=utf-8"
      })
    };
  }

  public async get() {
    try {
      if (!this.instance) {
        this.http
          .get<article[]>(this.path + "/api/article", this.headers)
          .subscribe(
            result => {
              this.Data = result;
              const kuliners = this.Data.filter(
                O => O.type === ArticleType.Kuliner
              );
              this.Kuliners = {
                datas: kuliners,
                selected: this.GetRandomArticle(kuliners)
              };

              const akomodasi = this.Data.filter(
                O => O.type === ArticleType.Akomodasi
              );
              this.Akomodasi = {
                datas: akomodasi,
                selected: this.GetRandomArticle(akomodasi)
              };

              const destination = this.Data.filter(
                O => O.type === ArticleType.Destinasi
              );
              this.Destinasi = {
                datas: destination,
                selected: this.GetRandomArticle(destination)
              };

              const dinas = this.Data.filter(O => O.type === ArticleType.Dinas);
              this.Dinas = { datas: dinas, selected: null };
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

  async SaveArticle(model: article) {
    try {
      if (model.idarticle != 0) {
        this.http.put<article>(this.path + "/api/article/"+model.idarticle, model, this.headers)
          .subscribe(
            result => {
              console.log(result);
            },
            error => {
              throw new Error(error);

            }
          );
      } else
        this.http
          .post<article>(this.path + "/api/article", model, this.headers)
          .subscribe(
            result => {
              console.log(result);
            },
            error => {
              throw new Error(error);
            }
          );
    } catch (error) {
      console.log(error);
    }
  }

  private GetRandomArticle(datas: article[]) {
    return datas[Math.floor(Math.random() * datas.length)];
  }
}
