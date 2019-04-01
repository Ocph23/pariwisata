import { Injectable, Inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { article, PanelArticle, ArticleType, agent, layanan } from '../models/models.component';
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
                  x.desc = x.content.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 200);
                  const html = document.createElement('html');
                  html.innerHTML = x.content;
                  const imgs = html.getElementsByTagName('img')[0];
                  if (imgs != null) {
                    x.thumb = imgs.src;
                  } else {
                    x.thumb = '/uploads/noimage.jpg';
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
      'title': ['', Validators.required],
      'content': ['', Validators.required],
      'thumb': ['', Validators.required],
      'type': [type, Validators.required],
      'createdate': [new Date(), Validators.required],
      'status': ['draft', Validators.required],
      'draft': ['', Validators.required],
    });
  }

  createEditForm(data: article, type: string) {
    return this.fb.group({
      'idarticle': [data.idarticle],
      'title': [data.title, Validators.required],
      'content': [data.content, Validators.required],
      'thumb': ['', Validators.required],
      'type': [type, Validators.required],
      'createdate': [data.createdate, Validators.required],
      'status': [data.status, Validators.required],
      'draft': [data.draft, Validators.required],
    });
  }



  public getImagesFromContent(content: string): string[] {

    const list = [];

    const html = document.createElement('html');
    html.innerHTML = content;
    const imgs = html.getElementsByTagName('img');

    for (let i = 0; i < imgs.length; i++) {
      const data = imgs.item(i);
      list.push(data.src);
    }

    return list;

  }

  public GetRandomArticle(datas: article[]) {
    return datas[Math.floor(Math.random() * datas.length)];
  }
}


export class AgentService {

  private instance = false;
  public source: agent[];
  sourceLayanan: layanan[];
  
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private router: Router, private auth: AuthService) {
    this.get();
  }
  
  saveNewLayanan(model: layanan){
    try {
      if (model.idservice !== undefined && model.idservice > 0) {
        return this.http.put<layanan>(this.baseUrl + 'api/Service?id=' + model.idservice, model, this.auth.getHttpHeader());
      } else {
        return this.http.post<layanan>(this.baseUrl + 'api/service', model, this.auth.getHttpHeader());
      }
    } catch (e) {
      console.log(e);
    }
  }


  public getLayanan() {
    return new Promise<layanan[]>((p, r) => {
      try {
        if (!this.instance) {
          this.http
            .get<layanan[]>(this.baseUrl + 'api/service', this.auth.getHttpHeader())
            .subscribe(
              result => {
                this.instance = true;
                result.forEach(x => {
                  x.desc = x.content.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 200);
                  const html = document.createElement('html');
                  html.innerHTML = x.content;
                  const imgs = html.getElementsByTagName('img')[0];
                  if (imgs != null) {
                    x.thumb = imgs.src;
                  } else {
                    x.thumb = '/uploads/noimage.jpg';
                  }
                });
                this.sourceLayanan = result;
                p(result);
              },
              error => {
                throw new Error(error);
              }
            );
        } else {
          p(this.sourceLayanan);
        }
      } catch (error) {
        r(error);
      }
    });
  }

  public get() {
    return new Promise<agent[]>((p, r) => {
      try {
        if (!this.instance) {
          this.http
            .get<agent[]>(this.baseUrl + 'api/agent', this.auth.getHttpHeader())
            .subscribe(
              result => {
                this.instance = true;
                result.forEach(x => {
                  x.desc = x.profile.replace(/<\/?[^>]+(>|$)/g, '').substring(0, 200);
                  const html = document.createElement('html');
                  html.innerHTML = x.profile;
                  const imgs = html.getElementsByTagName('img')[0];
                  if (imgs != null) {
                    x.thumb = imgs.src;
                  } else {
                    x.thumb = '/uploads/noimage.jpg';
                  }
                }); 
                this.source = result;
                p(result);
              },
              error => {
                throw new Error(error);
              }
            );
        } else {
          p(this.source);
        }
      } catch (error) {
        r(error);
      }
    });
  }

  createNewLayananForm() {
    return this.fb.group({
      'active': [true],
      'idagent': [0, Validators.required],
      'content': ['', Validators.required],
      'idservice': [0, Validators.required],
      'name': ['', Validators.required],
      'price': [0, Validators.required],
    });
  }

  createEditLayananForm(data: layanan) {
    return this.fb.group({
      'active': [data.active],
      'idagent': [data.idagent, Validators.required],
      'content': [data.content, Validators.required],
      'idservice': [data.idservice, Validators.required],
      'name': [data.name, Validators.required],
      'price': [data.price, Validators.required],
    });
  }


}
