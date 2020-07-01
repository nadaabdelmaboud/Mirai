import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
  constructor(private AuthService: AuthService, private router: Router) {}

  ngOnInit(): void {}
  RegisterUser() {
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
