import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  imageSrc: any;
  isImage: Boolean;
  constructor(private router: Router) {}

  ngOnInit(): void {
    if (!localStorage.getItem('zoo')) {
      localStorage.setItem('zoo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('zoo');
    }
  }
  navigateHome() {
    console.log('asas');
    this.router.navigate(['']);
  }
}
