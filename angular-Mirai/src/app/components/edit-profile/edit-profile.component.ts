import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProfileService } from '../../services/profile.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent implements OnInit {
  coverImage: any;
  profileImage: any;
  email: any;
  password: any;
  blogName: any;
  userName: any;
  user: any;
  URL: any;
  coverImageId: any;
  profileImageId: any;
  imageSrc: any;
  coverToUpload: File = null;
  profileToUpload: File = null;
  fileToUpload: File = null;

  constructor(private router: Router, private ProfileService: ProfileService) {}

  ngOnInit(): void {
    this.URL = 'http://localhost:3000/api/me/image?id=';
    this.ProfileService.getMe().subscribe((data) => {
      this.user = data;
      if (this.user.success) {
        this.coverImage = this.URL + this.user.user.coverImage;
        this.profileImage = this.URL + this.user.user.profileImage;
        this.email = this.user.user.email;
        this.blogName = this.user.user.blogName;
        this.userName = this.user.user.userName;
        this.user = this.user.user;
      } else {
        console.log('failed');
      }
    });
  }
  handleFileInput(files: FileList, type) {
    this.fileToUpload = files.item(0);
    this.uploadFileToActivity(type);
  }

  uploadFileToActivity(type) {
    this.ProfileService.postFile(this.fileToUpload).subscribe(
      (data) => {
        this.imageSrc = data;
        this.URL = 'http://localhost:3000/api/me/image?id=';
        if (type == 'cover') {
          this.coverImageId = this.imageSrc.imageId;
          this.coverImage = this.URL + this.imageSrc.imageId;
        } else if (type == 'profile') {
          this.profileImageId = this.imageSrc.imageId;
          this.profileImage = this.URL + this.imageSrc.imageId;
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
  EditUser() {
    const user = {
      coverImage: this.coverImageId,
      profileImage: this.profileImageId,
      email: this.email,
      blogName: this.blogName,
      userName: this.userName,
    };
    let check: any;
    this.ProfileService.editProfile(user).subscribe((data) => {
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
