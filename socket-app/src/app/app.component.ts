import { Component, OnInit } from '@angular/core';
import { ChatService } from './chat.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  msgList: string[] = [];

  user: string = '';

  msgForm = this.fb.group({
    message: ['']
  });

  constructor(private fb: FormBuilder,
              private chatService: ChatService) {

  }

  ngOnInit() {
    this.chatService.getMessages()
        .subscribe(
          (data: any) => {
            this.msgList.push(data);
          }
        );
  }

  sendMsg(): void {
    if (!this.user) {
      window.confirm('Please enter your name first.');
      return;
    }
    const newMsg = this.msgForm.get('message').value;
    this.chatService.sendMessage(this.user, newMsg);
    this.msgForm.get('message').reset();
  }

}
