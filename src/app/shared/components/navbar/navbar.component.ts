import { CustomerService } from './../../../services/customer.service';
import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  constructor(private authService : AuthService,
    private customerService: CustomerService,
    private router: Router) { }

  ngOnInit() {
  }

  showNavbar(){
    return !window.location.href.includes('login');
  }

  logout() {
    this.authService.logout();
  }

  clearCustomer(){
    this.customerService.selectedCustomer = undefined;
  }

}
