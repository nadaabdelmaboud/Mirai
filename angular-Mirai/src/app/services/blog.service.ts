import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  blogName: String;
  authToken: any;
  constructor(private http: HttpClient) {}
  getUserBlog(blogName) {
    this.blogName = blogName;
    return this.http.get('/api/' + blogName);
  }
  getMyBlog() {
    this.authToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authToken,
      }),
    };
    return this.http.get('/api/me/blog', httpOptions);
  }
  comment(commentText, blogName, index) {
    this.authToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authToken,
      }),
    };
    return this.http.post(
      '/api/me/comment',
      { commentText: commentText, blogName: blogName, index: index },
      httpOptions
    );
  }
}
