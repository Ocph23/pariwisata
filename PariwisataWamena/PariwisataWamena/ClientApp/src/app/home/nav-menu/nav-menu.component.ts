import { Component } from '@angular/core';
import { AuthService } from 'src/app/authentification/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent {
  navbarOpen = false;

  constructor(public auth: AuthService, private router:Router) {

  }

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
