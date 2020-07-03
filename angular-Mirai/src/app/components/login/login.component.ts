import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidationService } from '../../services/validation.service';

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
  iserror: any;
  error: any;
  constructor(
    private AuthService: AuthService,
    private router: Router,
    private ValidationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.email = '';
    this.password = '';
    this.error = '';
    this.iserror = false;
  }
  LoginUser() {
    let valid = this.ValidationService.validateLogin(this.email, this.password);
    if (valid.success) {
      let user = {
        email: this.email,
        password: this.password,
      };
      this.AuthService.userLogin(user).subscribe((data) => {
        this.login = data;
        if (this.login.success) {
          this.AuthService.setLocalStorage(this.login.token, this.login.user);
          this.router.navigate(['']);
        } else {
          this.iserror = true;
          this.error = 'Email or Password are not valid';
        }
      });
    } else {
      this.iserror = true;
      this.error = valid.text;
    }
  }
}
