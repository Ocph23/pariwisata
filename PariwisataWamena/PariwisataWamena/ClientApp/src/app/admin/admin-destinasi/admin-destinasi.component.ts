import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { article, PanelArticle, ArticleType } from 'src/app/models/models.component';
import { ArticleService } from 'src/app/home/article.service';
import { AlertService } from 'src/app/alert.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/authentification/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-destinasi',
  templateUrl: './admin-destinasi.component.html',
  styleUrls: ['../admin.component.scss', './admin-destinasi.component.scss']
})
export class AdminDestinasiComponent implements OnInit {
  @ViewChild('swalMessage') private swalMessage: SwalComponent;
  public destinasi:PanelArticle;
    form:FormGroup;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private auth: AuthService,
    private articleService: ArticleService,
    private alertService: AlertService,
  ) {
   // this.alertService.setSwal(this.swalMessage);
    this.articleService.getData(ArticleType.Destinasi).then(x => {
      this.destinasi = x;
    });
  }

  ngOnInit() {
    
    this.load();
  }

  private load() {
  

  }

  public addItem(data) {

  }


  editItem(data, content) {
    this.form = this.fb.group({
      'idarticle': [data.idarticle],
      'title': [data.title, Validators.required],
      'content': [data.content, Validators.required],
      'type': ['Desinasi', Validators.required],
      'createdate': [data.createdate, Validators.required],
      'status': [data.status, Validators.required],
      'draft': [data.draft, Validators.required],
    });
    this.modalService.open(content);
  }



}
