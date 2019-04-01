import { Component } from '@angular/core';
import { AuthService } from 'src/app/authentification/auth.service';
import { Router } from '@angular/router';
import { user } from 'src/app/models/models.component';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  navbarOpen = false;
  User :user ;
  constructor(public auth: AuthService, private router:Router) {

  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}






@Component({
  selector: 'app-menu-pesanan',
  templateUrl: './menu-pesanan.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class PesananMenuComponent {
  navbarOpen = false;
  User :user ;
  constructor(public auth: AuthService, private router:Router) {

  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
