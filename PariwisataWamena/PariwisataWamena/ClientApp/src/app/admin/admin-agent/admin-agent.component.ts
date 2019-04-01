import { Component, OnInit, Inject, ViewChild } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/authentification/auth.service';
import { AlertService } from 'src/app/alert.service';
import { SwalComponent } from '@sweetalert2/ngx-sweetalert2';

@Component({
  selector: 'app-admin-agent',
  templateUrl: './admin-agent.component.html',
  styleUrls: ['../admin.component.scss', './admin-agent.component.scss']
})

export class AdminAgentComponent implements OnInit {
  agentForm: any;
  closeResult: string;
  @ViewChild('messageSwal') private messageSwal: SwalComponent;
  agents: Array<any> = new Array<any>();
  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') private baseUrl: string,
    private fb: FormBuilder,
    private modalService: NgbModal,
    private auth: AuthService,
    private alertService: AlertService
  ) { }

  ngOnInit() {
    this.alertService.setSwal(this.messageSwal);
    const header = this.auth.getHttpHeader();
    this.http.get(this.baseUrl + 'api/agent', header)
      .subscribe(x => {
        this.agents = x as any[];
      }, error => {

        this.alertService.error(null, error.message);
      });
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
    const header = this.auth.getHttpHeader();
    if (data.idagent <= 0) {
      this.http.post(this.baseUrl + 'api/agent', data, header)
        .subscribe(x => {
          this.agents.push(x);
          this.alertService.success(null, "");
        }, error => {
          this.messageSwal.text = error.statusText;
          this.messageSwal.show();
        });
    } else {
      this.http.put(this.baseUrl + 'api/agent/' + data.idagent, data, header)
        .subscribe(x => {
          const agent = this.agents.find(x => x.idagent = data.idagent);
          agent.name = data.name;
          agent.contactName = data.contactname;
          agent.address = data.address;
          agent.telepon = data.telepon;
          this.alertService.success(null, "");
        }, error => {
          this.alertService.error(null, error.message);
        });
    }
  }

  editItem(data, content) {
    this.agentForm = this.fb.group({
      'idagent': [data.idagent],
      'name': [data.name, Validators.required],
      'contactname': [data.contactName, Validators.required],
      'email': [data.email, Validators.required],
      'address': [data.address, Validators.required],
      'telepon': [data.telepon, Validators.required],
      'profile': [data.profile, Validators.required],
    });
    this.modalService.open(content);
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
      return `with: ${reason}`;
    }
  }
}
