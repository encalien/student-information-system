import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: string[] = [];

  add(message: any) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}