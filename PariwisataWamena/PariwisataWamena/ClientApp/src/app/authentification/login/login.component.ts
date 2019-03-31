import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormBuilder  } from '@angular/forms';
import { Subject } from 'rxjs';
import {debounceTime} from 'rxjs/operators';
import { user } from 'src/app/models/models.component';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../authentification.component.scss', './login.component.scss']
})
export class LoginComponent implements OnInit {
  private user: user;
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
        if (this.auth.IsInRole('admin')) {
          this.router.navigate(['/admin']);
        } else if (this.auth.IsInRole('agent')) {
          this.auth.getAgentProfile();
          this.router.navigate(['/agent']);
        } else if (this.auth.IsInRole('tourist')) {
          this.router.navigate(['/main']);
        } else {

        }
      },
      error => {
        this._success.next(`${error.error.message}`);
      }
    );
  }
}
