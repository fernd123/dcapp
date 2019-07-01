import { Message } from 'primeng/api';
import { Injectable } from '@angular/core';

@Injectable()
export class MessageService {

  msgs: Message[] = [];

  constructor() { }

  setMessage(severity: string, summary: string, detail: string) {
    this.msgs = [];
    this.msgs.push({ severity: severity, summary: summary, detail: detail });
  }

}
