import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authToken: any;
  user: any;
  constructor(private http: HttpClient) {}
  userRegister(user) {
    return this.http.post('http://localhost:8080/api/register', user);
  }
  userBlogName() {
    this.getLocalStorage();
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authToken,
      }),
    };
    return this.http.get(
      'http://localhost:8080/api/user/blogname',
      httpOptions
    );
  }
  userLogin(user) {
    return this.http.post('http://localhost:8080/api/login', user);
  }
  setLocalStorage(token, user) {
    localStorage.clear();
    localStorage.setItem('token', token);
    localStorage.setItem('user', user);
    this.authToken = token;
    this.user = user;
  }
  getLocalStorage() {
    let token = localStorage.getItem('token');
    this.authToken = token;
  }
  isLogged() {
    this.getLocalStorage();
    const helper = new JwtHelperService();
    console.log(this.authToken);
    const isExpired = helper.isTokenExpired(this.authToken);
    console.log(isExpired);
    return !isExpired;
  }
  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
