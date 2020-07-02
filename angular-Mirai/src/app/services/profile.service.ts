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
    const endpoint = 'http://localhost:3000/api/me/uploadImage';
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
      'http://localhost:3000/api/me/post',
      { newPost: newPost, index: index },
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
      'http://localhost:3000/api/me/post',
      { newPost: newPost },
      httpOptions
    );
  }
}
