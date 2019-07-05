import { Globals } from './globals';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { User } from '../shared/models/user';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private uriEndPoint: string = Globals.URL_ENDPOINT_HEROKU+Globals.URL_LOGIN;

  constructor(private http: HttpClient,
    private router: Router,
    public jwtHelper: JwtHelperService) { }


  public isAuthenticated(): boolean {
    const token = this.getToken();
    return !this.jwtHelper.isTokenExpired(token);
  }

  getToken() {
    return sessionStorage.getItem(
      'token');
  }

  setToken(token: string) {
    sessionStorage.setItem(
      'token',
      token
    );
  }

  login(username: string, password: string) {
    let user = new User();
    user.username = username;
    user.password = password;

    return this.http.post<User>(this.uriEndPoint, user, { observe: 'response' });
  }

  logout() {
    this.setToken(null);
    this.router.navigate(['/login']);
  }
}
