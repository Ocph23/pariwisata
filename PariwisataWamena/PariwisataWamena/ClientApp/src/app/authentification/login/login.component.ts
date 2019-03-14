import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private user: User;
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {

  }

  login() {
    this.auth.login().add(x => {
      if (x) {
        this.router.navigate(['/admin']);
      }

    });
  }

}



export interface User {
  Id: number;
  FirstName: string;
  LastName: string;
  UserName: string;
  Password: string;
  token: string;
}
