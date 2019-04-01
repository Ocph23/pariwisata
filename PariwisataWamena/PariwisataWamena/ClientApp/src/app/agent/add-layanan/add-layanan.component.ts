import { Component, OnInit, Input } from '@angular/core';
import { layanan } from 'src/app/models/models.component';
import { AgentService } from 'src/app/home/article.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-add-layanan',
  templateUrl: './add-layanan.component.html',
  styleUrls: ['./add-layanan.component.css']
})

export class AddLayananComponent implements OnInit {

  @Input() form: FormGroup;

  constructor(private agentService: AgentService, 
    private router: ActivatedRoute,
    private modalService: NgbModal,
    public activeModal: NgbActiveModal) { }

  ngOnInit() {
  }

  saveItem(data: layanan) {
    this.agentService.saveNewLayanan(data).subscribe(x => {
      const result = { success: true, data: data };
      this.activeModal.close(result);
    });
  }

}
