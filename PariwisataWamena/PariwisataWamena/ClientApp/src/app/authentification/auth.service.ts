import { Injectable, Inject } from '@angular/core';
import { User } from './login/login.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token: User;
  constructor(
    private http: HttpClient,
     @Inject('BASE_URL') private baseUrl: string,
      private router: Router) {
  }


 login() {
  const user = {'UserName': 'ocph23@gmail.com', 'Password': 'sony'};
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })};

 return this.http.post<User>(this.baseUrl + 'api/Users/authenticate', user, httpOptions).subscribe(result => {
    this.token = result;
    this.router.navigate(['/admin']);
  }, 
  error => console.error(error));
}


public hasLogin() {
  if (this.token != null) {
    return true;
  }
  return false;

  }



  public getToken(): string {
    return this.token.token;
  }


}
