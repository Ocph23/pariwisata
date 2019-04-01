import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/authentification/auth.service';
import { layanan, IModalResult } from 'src/app/models/models.component';
import { AgentService } from 'src/app/home/article.service';
import { AlertService } from 'src/app/alert.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import {FormGroup } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import swal from 'sweetalert2';

@Component({
  selector: 'app-agent-layanan',
  templateUrl: './layanan.component.html',
  styleUrls: ['./layanan.component.scss', '../agent.component.scss']
})

export class LayananComponent implements OnInit {

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

  layanans: layanan[];
  closeResult: string;
  form: FormGroup;
    constructor(private authService: AuthService, public modalService: NgbModal,
      private agentService: AgentService, private alertService: AlertService) {

      agentService.getLayanan().then(x => {
        this.layanans = x;
      });

   }
  ngOnInit() {
  }

  addNewItem(content) {
    this.form = this.agentService.createNewLayananForm();
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }
  getDismissReason(reason: any): any {
    console.log(reason);
  }

  saveItem(data: layanan) {
    this.agentService.saveNewLayanan(data).subscribe(x => {
        if (data.idservice === 0) {
          this.layanans.push(x);
        }
    });

  }

  editItem(item, content) {
    this.form = this.agentService.createEditLayananForm(item);
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title', size: 'lg' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }


}
