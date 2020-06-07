import { Injectable } from '@angular/core';
import { Socket } from 'ngx-socket-io';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Message } from './message';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  constructor(private socket: Socket) { }

  public sendMessage(sender, message): void {
    console.log('sending message', message, this.socket);
    this.socket.emit('new-message', {
      sender: sender,
      msg: message
    });
  }

  public getMessages() {
    return new Observable(observer => {
      this.socket.on('broadcase', (data) => {
        observer.next(data);
      })
    });
  }
}
