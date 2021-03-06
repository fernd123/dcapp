import { Parent } from './../shared/models/parent';
import { User } from './../shared/models/user';
import { map } from 'rxjs/operators';

import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent extends Parent implements OnInit {
  model: any = {};
  error: boolean = false;

  constructor(
    private authService: AuthService,
    private router: Router
  ) { super(); }

  ngOnInit() {
    sessionStorage.setItem('token', '');
  }

  login() {
    this.isLoading = true;
    this.authService.login(this.model.username, this.model.password).subscribe(res => {
      if (res) {
        this.authService.setToken(res.headers.get('Authorization'));
        this.router.navigate(['/customers']);
        this.error = false;
        this.isLoading = false;
      }
      this.error = true;
    }, (error => { console.log(error); this.error = true; this.isLoading = false; }));
  }
}