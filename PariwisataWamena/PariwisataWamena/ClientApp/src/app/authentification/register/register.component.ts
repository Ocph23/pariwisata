import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../authentification.component.scss']
})
export class RegisterComponent implements OnInit {

  private message = '';
  private _success = new Subject<string>();
  private staticAlertClosed = true;
  genders: string[] = ['Pria', 'Wanita'];
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {
    this.registerForm = fb.group({
      'email': [null, Validators.required],
      'name': [null, Validators.required],
      'gender': [null, Validators.required],
      'address': [null, Validators.required],
      'telepon': [null, Validators.required],
    });





  }

  ngOnInit() {
    this._success.subscribe((param) => {
      this.staticAlertClosed = false;
      this.message = param; });
    this._success.pipe(
      debounceTime(7000)
    ).subscribe(() => {
      this.message = null;
      this.staticAlertClosed = true;
    });
  }



  register(item) {
    this.auth.register(item)
    .subscribe(
      result => {
        this.auth.storage.addObject('user', result);
        this._success.next(`Register Success, Check Your Email And Confirm Email !`);
        this.router.navigate(['/user/login']);
      },
      error => {
        this._success.next(`${error.message}`);
      }
    );
  }

}
