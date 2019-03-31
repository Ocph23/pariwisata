import { Component, OnInit, Inject } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { article, PanelArticle, ArticleType } from 'src/app/models/models.component';
import { ArticleService } from 'src/app/home/article.service';
import { AuthService } from 'src/app/authentification/auth.service';


@Component({
  selector: 'app-admin-dinas',
  templateUrl: './admin-dinas.component.html',
  styleUrls: ['../admin.component.scss', './admin-dinas.component.scss']
})
export class AdminDinasComponent implements OnInit {
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    uploadUrl: 'assets/images', // if needed
    customClasses: [ // optional
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };
  Data: PanelArticle;

 public Selected: article = {title: 'Profile', draft: 'type here'} as article;

  constructor(
    private auth: AuthService,
    private dinasService: ArticleService,
    @Inject('BASE_URL') private baseUrl: string
  ) {
    dinasService.getData(ArticleType.Dinas).then(x => {
      this.Data = x;
      });


  }

  public getContent(title: string) {
    if (this.Data == null) {
       this.Selected = {title: title.toUpperCase(), draft: 'type ' + title + ' here ...'} as article;
    } else {
        const findx = this.Data.datas.find(x => x.title.toLowerCase() === title.toLowerCase());
        if (findx != null) {
          this.Selected = findx;
        } else {
          this.Selected = {title: title.toUpperCase(), draft: 'type ' + title + ' here ...'} as article;
        }
       }

  }

  public save(data: article, status: string) {
    data.status = status;
    if (status == 'publish') {
      data.content = data.draft;
    }
    data.iduser = 1;
    data.type = ArticleType.Dinas;
    this.dinasService.SaveArticle(data).subscribe(x => {
      console.log('saved');

    }, error => {console.log(error); });
  }



  ngOnInit() {
  }

}
