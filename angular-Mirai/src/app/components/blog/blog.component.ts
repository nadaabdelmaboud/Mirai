import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  URL: String;
  blogName: any;
  blog: any;
  headingCss: {};
  check: Boolean;
  show: {};
  commentText: String;
  comments: any;
  styles: any;
  userName: String;
  posts: any;
  coverImageUrl: String;
  profileImageUrl: String;
  indecies: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private BlogService: BlogService,
    private AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('foo')) {
      localStorage.setItem('foo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('foo');
    }
    this.check = false;
    this.comments = [];
    this.blogName = this.activatedRoute.snapshot.paramMap.get('blogName');
    this.BlogService.getUserBlog(this.blogName).subscribe((data) => {
      this.blog = data;
      if (this.blog.success) {
        this.blog = this.blog.blog;
        this.URL = 'http://localhost:3000/api/me/image?id=';
        this.profileImageUrl = this.URL + this.blog.profileImage;
        this.coverImageUrl = this.URL + this.blog.coverImage;
        this.posts = this.blog.posts;
        this.userName = this.blog.userName;
        this.styles = [];
        this.indecies = [];
        for (var i = 0; i < this.posts.length; i++) {
          this.posts[i].imageId =
            'http://localhost:3000/api/me/image?id=' + this.posts[i].imageId;
          if (!this.posts[i].isImage) {
            this.styles.push({
              image: { display: 'none' },
              text: { float: 'left', width: '80%', padding: '10px' },
            });
          } else {
            this.styles.push({ image: {}, text: {} });
          }
          this.indecies.push(i);
        }
        console.log(this.blog);
      } else {
        console.log('blog not found');
      }
    });
    this.show = {
      visibility: 'hidden',
    };
    this.headingCss = {
      height: '100%',
    };
  }
  comment(i) {
    let checkAuth = this.AuthService.isLogged();
    console.log(checkAuth);
    i = this.posts.length - i - 1;
    if (checkAuth) {
      this.commentText = this.comments[i];
      this.BlogService.comment(this.commentText, this.blogName, i).subscribe(
        (data) => {
          let ch: any;
          ch = data;
          if (ch.success) {
            this.commentText = '';
            this.comments[i] = '';
          } else {
            console.log('failed');
          }
        }
      );
    } else {
      this.router.navigate(['']);
    }
  }
}
