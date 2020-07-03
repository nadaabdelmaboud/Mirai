import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { ProfileService } from '../../services/profile.service';
import { ValidationService } from '../../services/validation.service';

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
  userName: any;
  user: any;
  URL: any;
  coverImageId: any;
  profileImageId: any;
  error: any;
  iserror: any;
  imageSrc: any;
  coverToUpload: File = null;
  profileToUpload: File = null;
  fileToUpload: File = null;

  constructor(
    private router: Router,
    private ProfileService: ProfileService,
    private ValidationService: ValidationService
  ) {}

  ngOnInit(): void {
    this.iserror = false;
    this.error = '';
    this.password = '';
    if (!localStorage.getItem('soo')) {
      localStorage.setItem('soo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('soo');
    }
    this.URL = 'http://localhost:8080/api/me/image?id=';
    this.ProfileService.getMe().subscribe((data) => {
      this.user = data;
      if (this.user.success) {
        this.coverImage = this.URL + this.user.user.coverImage;
        this.profileImage = this.URL + this.user.user.profileImage;
        this.email = this.user.user.email;
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
        this.URL = 'http://localhost:8080/api/me/image?id=';
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
    let valid = this.ValidationService.validateEdit(
      this.email,
      this.password,
      this.userName,
      this.user
    );
    if (valid.success) {
      if (this.email != this.user.email) {
        this.ValidationService.validateEmail(this.email).subscribe((data) => {
          let checkExistMail: any;
          checkExistMail = data;
          console.log(checkExistMail);
          if (!checkExistMail.success) {
            this.iserror = true;
            this.error = 'Email is already existed';
          } else {
            let user: any;
            if (this.password != '') {
              user = {
                coverImage: this.coverImageId,
                profileImage: this.profileImageId,
                email: this.email,
                password: this.password,
                userName: this.userName,
              };
            } else {
              user = {
                coverImage: this.coverImageId,
                profileImage: this.profileImageId,
                email: this.email,
                userName: this.userName,
              };
            }

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
        });
      } else {
        let user: any;
        if (this.password != '') {
          user = {
            coverImage: this.coverImageId,
            profileImage: this.profileImageId,
            email: this.email,
            password: this.password,
            userName: this.userName,
          };
        } else {
          user = {
            coverImage: this.coverImageId,
            profileImage: this.profileImageId,
            email: this.email,
            userName: this.userName,
          };
        }

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
    } else {
      this.iserror = true;
      this.error = valid.text;
    }
  }
  navigateHome() {
    console.log('asas');
    this.router.navigate(['']);
  }
}
