import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/authentification/auth.service';
import { AlertConfigComponent, Alert } from 'src/app/alert-config/alert-config.component';
import { SwalComponent } from '@toverux/ngx-sweetalert2';

@Component({
  selector: 'app-admin-agent',
  templateUrl: './admin-agent.component.html',
  styleUrls: ['../admin.component.scss', './admin-agent.component.scss']
})
export class AdminAgentComponent implements OnInit {
  agentForm: any;
  closeResult: string;
  @ViewChild(AlertConfigComponent)
  @ViewChild('messageSwal') private messageSwal: SwalComponent;
  alertModel: Alert = {title: 'Judul', text: 'ini text', type: 'info', message: '', isShow: true};
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private auth: AuthService
    ) { }

  ngOnInit() {
  }

  public AddItem() {
    this.agentForm = this.fb.group({
      'idagent': [0],
      'name': [null, Validators.required],
      'contactname': [null, Validators.required],
      'email': [null, Validators.required],
      'address': [null, Validators.required],
      'telepon': [null, Validators.required],
      'profile': [null, Validators.required],
    });
  }
  saveChange(data) {
    const header=this.auth.getHttpHeader();
    this.http.post(this.baseUrl + 'api/agent', data, header)
    .subscribe(x => {

    }, error => {
      this.alertModel.title = error.statusText;
        this.messageSwal.text = error.statusText;
        this.messageSwal.show();
    });
  }


  open(content) {
    this.agentForm = this.fb.group({
      'idagent': [0],
      'name': [null, Validators.required],
      'contactname': [null, Validators.required],
      'email': [null, Validators.required],
      'address': [null, Validators.required],
      'telepon': [null, Validators.required],
      'profile': [null, Validators.required],
    });
    this.modalService.open(content);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }
}
