import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { TokenProviderService } from './token-provider.service';
import { MessageDto } from '../models/MessageDto';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private stompClient: any;
  private url = 'http://localhost:8080/chat';
  private socket!: WebSocket;

  constructor(private tokenProvider: TokenProviderService) {}

  public connect(): Observable<any> {
    return new Observable((observer) => {
      const authToken = this.tokenProvider.getToken();
      const headers = authToken ? { 'X-Authorization': authToken } : {};

      this.socket = new SockJS(this.url);
      this.stompClient = Stomp.over(this.socket);
      this.stompClient.connect(headers, () => {
        observer.next();
      }, (error : any) => {
        observer.error(error);
      });
    });
  }

  public disconnect() {
    if (this.stompClient) {
      this.stompClient.disconnect();
    }
  }

  subscribe(chatId: number): Observable<any> {
    const observable = new Observable(observer => {
      const topic = `/topic/messages/${chatId}`;
      if (this.stompClient) {
        this.stompClient.subscribe(topic, (message: any) => {
          observer.next(JSON.parse(message.body));
        });
      } else {
        observer.error('WebSocket connection not established.');
      }
    });
    return observable;
  }
  send(queue: string, messageDto: MessageDto): void {
    const body = JSON.stringify({
      queue,
      message: messageDto
    });
    this.stompClient.send('/app/send', {}, body);
  }
}
