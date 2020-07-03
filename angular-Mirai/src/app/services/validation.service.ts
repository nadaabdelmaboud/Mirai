import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { animationFrame } from 'rxjs/internal/scheduler/animationFrame';
@Injectable({
  providedIn: 'root',
})
export class ValidationService {
  constructor(private http: HttpClient) {}
  async validateRegister(userName, password, email, blogName) {
    if (userName == '' || password == '' || email == '' || blogName == '') {
      return { success: false, text: 'Please Fill in all data' };
    }
    if (password.length < 5) {
      return { success: false, text: 'Password is too short' };
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkmail = re.test(String(email).toLowerCase());
    if (!checkmail) {
      return { success: false, text: 'Please Enter valid email' };
    }
    return { success: true };
  }
  validateEmail(email) {
    let res: any;
    return this.http.post('http://localhost:3000/api/me/checkMail', {
      email: email,
    });
  }
  validateBlog(blogName) {
    let res: any;
    return this.http.post('http://localhost:3000/api/me/checkBlog', {
      blogName: blogName,
    });
  }
  validateLogin(email, password) {
    if (password == '' || email == '') {
      return { success: false, text: 'Please Fill in all data' };
    }
    if (password.length < 5) {
      return { success: false, text: 'Password is too short' };
    }
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const checkmail = re.test(String(email).toLowerCase());
    if (!checkmail) {
      return { success: false, text: 'Please Enter valid email' };
    }
    return { success: true };
  }
  validateEdit(email, password, userName, user) {
    if (user.userName != userName) {
      if (userName == '') {
        return { success: false, text: 'user name cant be empty' };
      }
    }
    if (password != '') {
      if (password.length < 5) {
        return { success: false, text: 'Password is too short' };
      }
    }
    if (user.email != email) {
      if (email == '') {
        return { success: false, text: 'email cant be empty' };
      }
      const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      const checkmail = re.test(String(email).toLowerCase());
      if (!checkmail) {
        return { success: false, text: 'Please Enter valid email' };
      }
    }
    return { success: true };
  }
}
