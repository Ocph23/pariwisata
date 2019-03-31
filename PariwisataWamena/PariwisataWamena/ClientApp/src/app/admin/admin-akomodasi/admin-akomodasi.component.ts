import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { article, PanelArticle, ArticleType, IModalResult } from 'src/app/models/models.component';
import { ArticleService } from 'src/app/home/article.service';
import { FormGroup } from '@angular/forms';
import { AlertService } from 'src/app/alert.service';
import { SwalComponent } from '@toverux/ngx-sweetalert2';
import { AdminAddArticleComponent } from '../admin-add-article/admin-add-article.component';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-admin-akomodasi',
  templateUrl: './admin-akomodasi.component.html',
  styleUrls: ['../admin.component.scss', './admin-akomodasi.component.scss']
})


export class AdminAkomodasiComponent implements OnInit {
  @ViewChild('swalMessage') swal: SwalComponent;
 // @ViewChild(AdminAddArticleComponent) addArticle: AdminAddArticleComponent;
  private Akomodasi: PanelArticle = { selected: null, datas: [] };
    form:FormGroup;
  constructor(
    private router: Router,
    private articleService: ArticleService,
    private alertService: AlertService,
    private modalService: NgbModal
  ) { }
  DataSelected: any;

  ngOnInit() {

    this.alertService.setSwal(this.swal);
    this.articleService.getData(ArticleType.Akomodasi).then(x => {
      this.Akomodasi = x;
    })
  }
  

  goTo (){
   
    const data ={'Type':'Akomodasi', 'Title':'', 'Content':'Siapa'};
    this.router.navigate(['/admin/article',data]);
  }

  editItem(data: article) {
    const ref = this.modalService.open(AdminAddArticleComponent, { size: 'lg' });
    ref.componentInstance.form = this.articleService.createEditForm(data, "Akomodasi");
    ref.result.then(x => {
      var result = x as IModalResult;
    });
  }



  addNewItem(data: article) {
    const ref = this.modalService.open(AdminAddArticleComponent, { size:'lg' })
    ref.componentInstance.form = this.articleService.createNewForm("Akomodasi");
    ref.result.then(x => {
      var result = x as IModalResult;
      this.alertService.success(null, "success");
      this.Akomodasi.datas.push(result.data);
    });
  }

}
