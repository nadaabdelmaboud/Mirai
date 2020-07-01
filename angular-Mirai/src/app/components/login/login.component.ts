import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: String;
  password: String;
  login: any;
  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  LoginUser() {
    let user = {
      email: this.email,
      password: this.password,
    };
    this.AuthService.userLogin(user).subscribe((data) => {
      this.login = data;
      if (this.login.success) {
        console.log(this.login);
        this.AuthService.setLocalStorage(this.login.token, this.login.user);
      } else {
        console.log('cant login');
      }
    });
  }
}
