import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { BlogService } from '../../services/blog.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { SocketService } from '../../services/socket.service';

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
    private router: Router,
    private SocketService: SocketService
  ) {
    this.SocketService.recieveComment().subscribe((data) => {
      let post = document.getElementsByClassName('allpost');
      let comment = document.createElement('div');
      comment.classList.add('commentcard');
      let cardImage = document.createElement('div');
      cardImage.classList.add('cardImage');
      let image = document.createElement('img');
      let label1 = document.createElement('label');
      let label2 = document.createElement('label');
      label2.style.fontSize = 'smaller';
      label2.style.marginLeft = '10px';
      image.src =
        'http://localhost:8080/api/me/image?id=' + data.commentterImage;
      label1.innerText = data.commentterName;
      label2.innerText = data.date;
      cardImage.classList.add('cardImage');
      cardImage.appendChild(image);
      cardImage.appendChild(label1);
      cardImage.appendChild(label2);
      comment.appendChild(cardImage);
      let commentText = document.createElement('div');
      commentText.classList.add('commentText');
      let p = document.createElement('p');
      p.innerText = data.commentText;
      commentText.appendChild(p);
      comment.appendChild(commentText);
      post[data.postIndex]
        .querySelector('.commentSection')
        .appendChild(comment);
    });
  }

  ngOnInit(): void {
    if (!localStorage.getItem('loo')) {
      localStorage.setItem('loo', 'no reload');
      location.reload();
    } else {
      localStorage.removeItem('loo');
    }

    this.URL = 'http://localhost:8080/api/me/image?id=';
    this.BlogService.getMyBlog().subscribe((data) => {
      this.blog = data;
      console.log(this.blog);
      if (this.blog.success) {
        this.blog = this.blog.blog;
        this.URL = 'http://localhost:8080/api/me/image?id=';
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
          this.posts[i].imageId =
            'http://localhost:8080/api/me/image?id=' + this.posts[i].imageId;
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
