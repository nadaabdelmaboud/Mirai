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
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.authService.isLogged());
  }
  navigateRegister() {
    this.router.navigate(['/register']);
  }
  navigateLogin() {
    this.router.navigate(['/login']);
  }
  navigateProfile() {
    this.router.navigate(['/profile']);
  }
  navigateBlog() {
    this.router.navigate(['/blog']);
  }
  Logout() {
    this.authService.logout();
  }
}
