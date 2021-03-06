import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  authToken: any;
  constructor(private httpClient: HttpClient) {}
  postFile(fileToUpload: File) {
    this.authToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: this.authToken,
      }),
    };
    const endpoint = 'http://localhost:8080/api/me/uploadImage';
    const formData: FormData = new FormData();
    formData.set('file', fileToUpload);
    console.log(formData);

    return this.httpClient.post(endpoint, formData, httpOptions);
  }
  editPost(newPost, index) {
    this.authToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authToken,
      }),
    };
    return this.httpClient.put(
      'http://localhost:8080/api/me/post',
      { newPost: newPost, index: index },
      httpOptions
    );
  }
  editProfile(user) {
    this.authToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authToken,
      }),
    };
    return this.httpClient.put(
      'http://localhost:8080/api/me/profile',
      { user: user },
      httpOptions
    );
  }
  getMe() {
    this.authToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authToken,
      }),
    };
    return this.httpClient.get(
      'http://localhost:8080/api/me/profile',
      httpOptions
    );
  }
  createPost(newPost) {
    this.authToken = localStorage.getItem('token');
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: this.authToken,
      }),
    };
    return this.httpClient.post(
      'http://localhost:8080/api/me/post',
      { newPost: newPost },
      httpOptions
    );
  }
}
