import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder  } from '@angular/forms';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private user: User;
  loginForm: FormGroup;
  constructor(private auth: AuthService,  private router: Router, private fb: FormBuilder) {
    this.loginForm = fb.group({
      'userName': [null, Validators.required],
      'password': [null, Validators.required]
    });


  }

  private message = '';
  private _success = new Subject<string>();
  private staticAlertClosed = true;
  ngOnInit() {
    this._success.subscribe((param) => {
      this.staticAlertClosed = false;
      this.message = param; });
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => {
      this.message = null;
      this.staticAlertClosed = true;
    });
  }

  login(item) {
    this.auth.login(item.userName, item.password)
    .subscribe(
      result => {
        this.auth.storage.addObject('user', result);
        if (this.auth.IsInRole('Admin')) {
          this.router.navigate(['/admin']);
        } else if (this.auth.IsInRole('Agent')) {
          this.router.navigate(['/agent']);
        } else if (this.auth.IsInRole('Tourist')) {
          this.router.navigate(['/main']);
        } else {

        }
      },
      error => {
        this._success.next(`${error.error.message}`);
      }
    );
  }
  onSubmit() {
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
