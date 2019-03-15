import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "../auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private user: User;
  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit() {}

  login() {
    this.auth.login().add(x => {
      if (x) {
        this.router.navigate(["/admin"]);
      }
    });
  }
}

export interface User {
  iduser: number;

  username: string;

  password: string;

  avatar: string;

  token: string;
  roles: role[];
  PasswordHash: string;
  PasswordSalt: string;
}

export interface role {
  idrole: number;
  name: string;
}
