import { Component, OnInit, Input } from '@angular/core';
import {  ActivatedRoute } from '@angular/router';
import { article } from 'src/app/models/models.component';
import { FormGroup } from '@angular/forms';
import { ArticleService } from 'src/app/home/article.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'adminaddarticle',
  templateUrl: './admin-add-article.component.html',
  styleUrls: ['../admin.component.scss', './admin-add-article.component.scss']
})

export class AdminAddArticleComponent implements OnInit {
  
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    uploadUrl: 'api/Image/upload', // if needed
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

  @Input() form: FormGroup;


  title: string;
  constructor(private router: ActivatedRoute,
    private articleService: ArticleService,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal


  ) { }

  ngOnInit() {
    //this.form = this.articleService.createNewForm('Akomodasi');
  }

  saveDraft(data: article) {
    this.articleService.saveDraft(data).subscribe(x => {
      const result = { success: true, data: data }
      this.activeModal.close(result);
    })
  }

  savePublish(data: article) {
    data.status = 'publish';
    this.articleService.savePublish(data).subscribe(x => {
      const result = { success: true, data: data }
      this.activeModal.close(result);
    })
  }


  addItem(content) {
    this.modalService.open(content, {
      size: 'lg'
    });
  }

  public editItem(data: article): void {
    this.form = this.articleService.createEditForm(data, "Akomodasi");
   
  }

}

