import { Component, OnInit, ViewChild } from '@angular/core';
import { SwalComponent }  from '@sweetalert2/ngx-sweetalert2';
import { PanelArticle, ArticleType, article, IModalResult } from 'src/app/models/models.component';
import { FormGroup } from '@angular/forms';
import { ArticleService } from 'src/app/home/article.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlertService } from 'src/app/alert.service';
import { AdminAddArticleComponent } from '../admin-add-article/admin-add-article.component';

@Component({
  selector: 'app-admin-kuliner',
  templateUrl: './admin-kuliner.component.html',
  styleUrls: ['../admin.component.scss', './admin-kuliner.component.scss']
})
export class AdminKulinerComponent implements OnInit {
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
    this.articleService.getData(ArticleType.Kuliner).then(x => {
      this.Akomodasi = x;
    })
  }

  editItem(data: article) {
    const ref = this.modalService.open(AdminAddArticleComponent, { size: 'lg' });
    ref.componentInstance.form = this.articleService.createEditForm(data, "Kuliner");
    ref.result.then(x => {
      var result = x as IModalResult;
    });
  }



  addNewItem(data: article) {
    const ref = this.modalService.open(AdminAddArticleComponent, { size: 'lg' })
    ref.componentInstance.form = this.articleService.createNewForm("Kuliner");
    ref.result.then(x => {
      var result = x as IModalResult;
      this.alertService.success(null, "success");
      this.Akomodasi.datas.push(result.data);
    });
  }


}
