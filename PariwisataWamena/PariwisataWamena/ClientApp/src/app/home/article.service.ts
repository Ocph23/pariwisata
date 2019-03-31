import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { article, PanelArticle, ArticleType } from '../models/models.component';
import { AuthService } from '../authentification/auth.service';
import { delay } from 'q';
import { FormBuilder, Validators } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class ArticleService {
  private instance = false;
  public Data: article[];
  public Kuliners: PanelArticle = null;
  public Akomodasi: PanelArticle;
  public Destinasi: PanelArticle;
  currentArticle: article;
  Dinas: PanelArticle;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router, private auth: AuthService) {
    this.get();
  }

  public get() {
    return new Promise<article[]>((p, r) => {
      try {
        if (!this.instance) {
          this.http
            .get<article[]>(this.baseUrl + 'api/article', this.auth.getHttpHeader())
            .subscribe(
              result => {
                this.instance = true;
                result.forEach(x => {
                  x.desc = x.content.replace(/<\/?[^>]+(>|$)/g, "").substring(0, 200);
                  let html = document.createElement('html');
                  html.innerHTML = x.content;
                  var imgs = html.getElementsByTagName("img")[0];
                  if (imgs != null)
                    x.thumb = imgs.src;
                  else {
                    x.thumb = "/uploads/noimage.jpg";
                  }
                });
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

 async getData(param: ArticleType) {
    let result: PanelArticle;
   await this.get().then(x => {
      const datas = x.filter(O => O.type === param);
      result = {
        datas: datas, selected: this.GetRandomArticle(datas)
      } as PanelArticle;
    });
    return result;
  }

  SaveArticle(model: article) {
    try {
      // const token = 'Bearer ' + this.auth.getToken();
      // this.headers = {
      //   headers: new HttpHeaders({
      //     'Content-Type': 'application/json',
      //     'Authorization': token
      //   })
      // };

      if (model.idarticle !== undefined && model.idarticle > 0) {
           return this.http.put<article>(this.baseUrl + 'api/article/' + model.idarticle, model, this.auth.getHttpHeader());
      } else {
        return  this.http.post<article>(this.baseUrl + 'api/article', model, this.auth.getHttpHeader());
      }
    } catch (error) {
      console.log(error);
    }
  }

  savePublish(data: article) {
    data.content = data.draft;
   return  this.SaveArticle(data);
  }


  saveDraft(data: article) {
    return this.SaveArticle(data);
  }


  publish(data: number) {
    
  }


  unPublish(data: number) {

  }




  createNewForm(type: string) {
    return this.fb.group({
      'idarticle': 0,
      'title': ["", Validators.required],
      'content': ["", Validators.required],
      'thumb': ["", Validators.required],
      'type': [type, Validators.required],
      'createdate': [new Date(), Validators.required],
      'status': ["draft", Validators.required],
      'draft': ["", Validators.required],
    });
  }

  createEditForm(data: article, type: string) {
    return this.fb.group({
      'idarticle': [data.idarticle],
      'title': [data.title, Validators.required],
      'content': [data.content, Validators.required],
      'thumb': ["", Validators.required],
      'type': [type, Validators.required],
      'createdate': [data.createdate, Validators.required],
      'status': [data.status, Validators.required],
      'draft': [data.draft, Validators.required],
    });
  }



  public getImagesFromContent(content: string): string[] {

    let list = [];

    let html = document.createElement('html');
    html.innerHTML = content;
    var imgs = html.getElementsByTagName("img");

    for (let i = 0; i < imgs.length; i++) {
      var data = imgs.item(i);
      list.push(data.src);
    }

    return list;
   
  }

  public GetRandomArticle(datas: article[]) {
    return datas[Math.floor(Math.random() * datas.length)];
  }
}
