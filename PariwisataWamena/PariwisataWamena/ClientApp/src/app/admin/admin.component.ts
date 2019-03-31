import { Component, OnInit } from '@angular/core';
import { Router, Route } from '@angular/router';
import { AuthService } from '../authentification/auth.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
public isExpanded: Boolean;
  constructor( private router: Router, private auth: AuthService) {
  }

  ngOnInit() {
    if (!this.auth.IsInRole('admin')) {
         this.router.navigate(['/user/login']);
     }
     console.log('have account');
  }
  

}
