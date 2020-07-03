import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  imageSrc: any;
  isImage: Boolean;
  imageId: any;
  postText: String;
  fileToUpload: File = null;
  URL: any;
  imageStyle: any;

  constructor(private router: Router, private ProfileService: ProfileService) {}

  ngOnInit(): void {
    this.imageStyle = {
      display: 'none',
    };
    if (!localStorage.getItem('zoo')) {
      localStorage.setItem('zoo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('zoo');
    }
  }
  handleFileInput(files: FileList) {
    this.imageStyle = {
      display: 'inline',
    };
    this.fileToUpload = files.item(0);
    this.uploadFileToActivity();
  }
  uploadFileToActivity() {
    this.ProfileService.postFile(this.fileToUpload).subscribe(
      (data) => {
        this.imageSrc = data;
        this.URL = 'http://localhost:8080/api/me/image?id=';
        this.imageId = this.imageSrc.imageId;
        this.imageSrc = this.URL + this.imageSrc.imageId;
      },
      (error) => {
        console.log(error);
      }
    );
  }
  createPost() {
    let check;
    if (this.imageStyle.display == 'none') {
      check = false;
    } else {
      check = true;
    }
    const newPost = {
      isImage: check,
      imageId: this.imageId,
      postText: this.postText,
    };
    this.ProfileService.createPost(newPost).subscribe((data) => {
      check;
      check = data;
      if (check.success) {
        location.reload();
      } else {
        console.log('failed');
      }
    });
  }
  navigateHome() {
    console.log('asas');
    this.router.navigate(['']);
  }
}
