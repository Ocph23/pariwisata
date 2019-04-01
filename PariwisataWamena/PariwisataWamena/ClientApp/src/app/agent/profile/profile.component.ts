import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { AlertService } from 'src/app/alert.service';
import { ActivatedRoute } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { IModalResult, agent } from 'src/app/models/models.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/authentification/auth.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class AgentProfileComponent implements OnInit {

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

  @ViewChild('swalMessage') swal: SwalComponent;
  form: FormGroup;

  constructor(
    private alertService: AlertService,
    private fb: FormBuilder,
    private activeRoute: ActivatedRoute,
    private http: HttpClient,
    private auth: AuthService
  ) {


    this.activeRoute.params.subscribe(params => {
     const data = params as agent;
     this.form= this.fb.group({
        'idagent': [data.idagent, Validators.required],
        'name': [data.name, Validators.required],
        'contactname': [data.contactName, Validators.required],
        'email': [data.email, Validators.required],
        'address': [data.address, Validators.required],
        'telepon': [data.telepon, Validators.required],
        'profile': [data.profile, Validators.required],
      });
    }); 
  }
  ngOnInit() {

    this.alertService.setSwal(this.swal);

  }
  save(data: agent) {
    this.http.put<agent>('api/agent/'+data.idagent, data, this.auth.getHttpHeader())
      .subscribe(x => {
        this.alertService.success(null,"success");
      }, error => {
        this.alertService.error("error", error);
      });
  }
  
}
