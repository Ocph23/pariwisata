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
  constructor(private authService: AuthService, router: Router) {
    if (!authService.hasLogin()) {
        router.navigate(['account/login']);
     }
  }

  ngOnInit() {



  }



  toggle() {

  }

}
