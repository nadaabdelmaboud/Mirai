import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  blogname: any;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('qoo')) {
      localStorage.setItem('qoo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('qoo');
    }
  }
  navigateRegister() {
    this.router.navigate(['/register']);
  }
  navigateLogin() {
    this.router.navigate(['/login']);
  }
  navigateProfile() {
    this.router.navigate(['/profile/createPost']);
  }
  navigateBlog() {
    this.authService.userBlogName().subscribe((data) => {
      this.blogname = data;
      this.blogname = this.blogname.blogname;
      this.router.navigate(['/blog/' + this.blogname]);
    });
  }
  Logout() {
    this.authService.logout();
  }
}
