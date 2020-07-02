import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ViewEncapsulation } from '@angular/core';
import { ProfileService } from '../../services/profile.service';
import { Router } from '@angular/router';
import { BlogService } from '../../services/blog.service';
import { NONE_TYPE } from '@angular/compiler';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss'],
})
export class EditPostComponent implements OnInit {
  URL: String;
  blog: any;
  posts: any;
  indecies: any;
  styles: any;
  fileToUpload: File = null;
  imageSrc: any;
  imageIds = [];
  newPosts: [
    {
      id: String;
      postText: String;
      isImage: Boolean;
      imageId: String;
    }
  ];

  constructor(
    private router: Router,
    private ProfileService: ProfileService,
    private BlogService: BlogService
  ) {}

  ngOnInit(): void {
    this.URL = 'http://localhost:3000/api/me/image?id=';
    this.BlogService.getMyBlog().subscribe((data) => {
      this.blog = data;
      console.log(this.blog);
      if (this.blog.success) {
        this.blog = this.blog.blog;
        this.URL = 'http://localhost:3000/api/me/image?id=';
        this.posts = this.blog.posts;
        this.styles = [];
        this.newPosts = this.blog.posts;
        this.indecies = [];
        for (var i = 0; i < this.posts.length; i++) {
          this.imageIds.push(this.posts[i].imageId);
          this.posts[i].imageId =
            'http://localhost:3000/api/me/image?id=' + this.posts[i].imageId;
          if (!this.posts[i].isImage) {
            this.styles.push({ display: 'none' });
          } else {
            this.styles.push({ display: 'inline' });
          }
          this.indecies.push(i);
        }
        console.log(this.posts[0]);
      } else {
        console.log('blog not found');
      }
    });
  }
  editPost(index) {
    let check;
    if (this.styles[index].display == 'none') {
      check = false;
    } else {
      check = true;
    }
    const postEdit = {
      imageId: this.imageIds[index],
      isImage: check,
      postText: this.newPosts[index].postText,
    };
    this.ProfileService.editPost(postEdit, index).subscribe((data) => {
      check;
      check = data;
      if (check.success) {
        location.reload();
      } else {
        console.log('failed');
      }
    });
  }
  clearImage(index) {
    this.styles[index].display = 'none';
    this.posts[index].imageId = '';
    this.newPosts[index].isImage = false;
    this.newPosts[index].imageId = '';
  }
  handleFileInput(files: FileList, index) {
    this.fileToUpload = files.item(0);
    this.uploadFileToActivity(index);
  }
  uploadFileToActivity(index) {
    this.ProfileService.postFile(this.fileToUpload).subscribe(
      (data) => {
        this.styles[index].display = 'inline';
        this.imageSrc = data;
        this.URL = 'http://localhost:3000/api/me/image?id=';
        this.posts[index].imageId = this.URL + this.imageSrc.imageId;
        console.log(this.posts[index].imageId);
        this.newPosts[index].imageId = this.URL + this.imageSrc.imageId;
        this.imageIds[index] = this.imageSrc.imageId;
        console.log(this.newPosts[index].imageId);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  navigateHome() {
    this.router.navigate(['']);
  }
}
