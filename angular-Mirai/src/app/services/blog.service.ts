import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class BlogService {
  blogName: String;

  constructor(private http: HttpClient) {}
  getUserBlog(blogName) {
    this.blogName = blogName;
    return this.http.get('http://localhost:3000/api/' + blogName);
  }
}
