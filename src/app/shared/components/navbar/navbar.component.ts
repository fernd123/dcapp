import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private authService : AuthService) { }

  ngOnInit() {
  }

  showNavbar(){
    return !window.location.href.includes('login');
  }

  logout() {
    this.authService.logout();
  }

}
