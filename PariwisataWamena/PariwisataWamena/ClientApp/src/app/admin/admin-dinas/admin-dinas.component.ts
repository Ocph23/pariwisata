import { Component, OnInit } from '@angular/core';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { article } from 'src/app/models/models.component';


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

  public model:article;
  constructor() {

    var m ={title:'profile', content:"ini context"};
    this.model = m as article;


  }

  ngOnInit() {
  }

}
