import { Component, OnInit, Input,Output, EventEmitter, ElementRef, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { article } from 'src/app/models/models.component';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ArticleService } from 'src/app/home/article.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'agentaddservice',
  templateUrl: './agent-add-service.component.html',
  styleUrls: ['../agent.component.scss', './agent-add-service.component.scss']
})



export class AgentAddServiceComponent implements OnInit {
  
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
  @ViewChild("content") headerEl: ElementRef;


  title: string;
  constructor(private router: ActivatedRoute,
    private articleService: ArticleService,
    private modalService: NgbModal,
    private elementRef: ElementRef,
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
    var content = this.elementRef.nativeElement.getElementsByClassName("modal");
    this.modalService.open(this.headerEl, {
      size: 'lg'
    });
  }

}

