import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { article, PanelArticle, ArticleType, IModalResult } from 'src/app/models/models.component';
import { ArticleService } from 'src/app/home/article.service';
import { AlertService } from 'src/app/alert.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';
import { FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AdminAddArticleComponent } from '../admin-add-article/admin-add-article.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-admin-destinasi',
  templateUrl: './admin-destinasi.component.html',
  styleUrls: ['../admin.component.scss', './admin-destinasi.component.scss']
})


export class AdminDestinasiComponent implements OnInit {
  @ViewChild('swalMessage') swal: SwalComponent;
  // @ViewChild(AdminAddArticleComponent) addArticle: AdminAddArticleComponent;
  private Akomodasi: PanelArticle = { selected: null, datas: [] };
  form: FormGroup;
  constructor(
    private router: Router,
    private articleService: ArticleService,
    private alertService: AlertService,
    private modalService: NgbModal
  ) { }
  DataSelected: any;

  ngOnInit() {

    this.alertService.setSwal(this.swal);
    this.articleService.getData(ArticleType.Destinasi).then(x => {
      this.Akomodasi = x;
    })
  }

  editItem(data: article) {
    const ref = this.modalService.open(AdminAddArticleComponent, { size: 'lg' });
    ref.componentInstance.form = this.articleService.createEditForm(data, "Destinasi");
    ref.result.then(x => {
      var result = x as IModalResult;
    });
  }



  addNewItem(data: article) {
    const ref = this.modalService.open(AdminAddArticleComponent, { size: 'lg' })
    ref.componentInstance.form = this.articleService.createNewForm("Destinasi");
    ref.result.then(x => {
      var result = x as IModalResult;
      this.alertService.success(null, "success");
      this.Akomodasi.datas.push(result.data);
    });
  };
}
