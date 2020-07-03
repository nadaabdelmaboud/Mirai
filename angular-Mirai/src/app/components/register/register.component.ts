import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { ValidationService } from '../../services/validation.service';
@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userName: String;
  blogName: String;
  password: String;
  email: String;
  res: any;
  error: any;
  iserror: any;
  constructor(
    private AuthService: AuthService,
    private router: Router,
    private ValidationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.iserror = false;
    this.error = '';
    this.userName = '';
    this.blogName = '';
    this.password = '';
    this.email = '';
  }
  async RegisterUser() {
    let valid = await this.ValidationService.validateRegister(
      this.userName,
      this.password,
      this.email,
      this.blogName
    );
    if (valid.success) {
      this.ValidationService.validateEmail(this.email).subscribe((data) => {
        let checkExistMail: any;
        checkExistMail = data;
        console.log(checkExistMail);
        if (!checkExistMail.success) {
          this.iserror = true;
          this.error = 'Email is already existed';
        } else {
          this.ValidationService.validateBlog(this.blogName).subscribe(
            (data) => {
              let checkExistBlog: any;
              checkExistBlog = data;
              console.log(checkExistBlog);
              if (!checkExistBlog.success) {
                this.iserror = true;
                this.error = 'Blog Name is already existed';
              } else {
                const user = {
                  userName: this.userName,
                  blogName: this.blogName,
                  password: this.password,
                  email: this.email,
                };

                this.AuthService.userRegister(user).subscribe((data) => {
                  this.res = data;
                  if (this.res.success) {
                    this.router.navigate(['/login']);
                  }
                });
              }
            }
          );
        }
      });
    } else {
      this.iserror = true;
      this.error = valid.text;
    }
  }
}
