import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  encapsulation: ViewEncapsulation.None,
  selector: 'app-see-comments',
  templateUrl: './see-comments.component.html',
  styleUrls: ['./see-comments.component.scss'],
})
export class SeeCommentsComponent implements OnInit {
  URL: String;
  blogName: any;
  blog: any;
  check: Boolean;
  commentText: String;
  comments: any;
  commentsCheck: any;
  commentsLength: any;
  styles: any;
  posts: any;
  indecies: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private BlogService: BlogService,
    private AuthService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!localStorage.getItem('loo')) {
      localStorage.setItem('loo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('loo');
    }
    this.URL = '/api/me/image?id=';
    this.BlogService.getMyBlog().subscribe((data) => {
      this.blog = data;
      console.log(this.blog);
      if (this.blog.success) {
        this.blog = this.blog.blog;
        this.URL = '/api/me/image?id=';
        this.posts = this.blog.posts;
        this.styles = [];
        this.indecies = [];
        this.commentsCheck = [];
        this.commentsLength = [[]];
        for (var i = 0; i < this.posts.length; i++) {
          if (this.posts[i].comments.length == 0) {
            console.log(false);
            this.commentsCheck.push(false);
          } else {
            console.log(true);
            this.commentsCheck.push(true);
          }
          this.commentsLength.push([]);
          for (var j = 0; j < this.posts[i].comments.length; j++) {
            this.commentsLength[i].push(Number(j));
            this.posts[i].comments[j].commentter.profileImage =
              this.URL + this.posts[i].comments[j].commentter.profileImage;
          }
          this.posts[i].imageId = '/api/me/image?id=' + this.posts[i].imageId;
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
        console.log(this.posts[0]);
      } else {
        console.log('blog not found');
      }
    });
  }
  see() {
    console.log(this.commentsLength);
  }
  navigateHome() {
    this.router.navigate(['']);
  }
}
