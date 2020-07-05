import { Injectable } from '@angular/core';
import { from } from 'rxjs';
import * as io from 'socket.io-client';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: SocketIOClient.Socket;
  constructor() {
    let userId = localStorage.getItem('user');
    if (userId) {
      this.socket = io.connect('http://localhost:8080');
      this.connectSocket(userId);
    }
  }
  connectSocket(userId) {
    this.socket.emit('setUserId', {
      userId: userId,
    });
  }
  comment(text, blogName, index, user) {
    this.socket.emit('comment', {
      text: text,
      blogName: blogName,
      postIndex: index,
      user: user,
    });
  }
  disconnectSocket(userId) {
    this.socket.emit('clearUserId', {
      userId: userId,
    });
  }
  recieveComment() {
    return Observable.create((observer) => {
      this.socket.on('sendComment', (data) => {
        observer.next(data);
      });
    });
  }
}
