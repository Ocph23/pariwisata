import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentification/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})

export class AgentComponent implements OnInit {
  isExpanded: Boolean;
  private Datas: any={name:''};
  constructor(private auth: AuthService, private router: Router) {
    if (!this.auth.IsInRole('agent')) {
      this.router.navigate(['/user/login']);
    } else {
      this.auth.getAgentProfile().subscribe(x => {
        this.Datas = x;
      });
    }
  }

  ngOnInit() {
  }
}
