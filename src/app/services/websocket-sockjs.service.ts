import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import {MessageDto} from "../models/MessageDto";
import {TokenProviderService} from "./token-provider.service";

@Injectable({
  providedIn: 'root'
})
export class WebsocketSockjsService {
  webSocketEndPoint: string = 'http://localhost:8080/chat';
  stompClient: any;
  messages: MessageDto[] = [];

  private bearer = "Bearer ";
  constructor(private token: TokenProviderService) {
  }
  _connect(topic: string) {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint,null, {
      // transports: ['xhr-streaming'],
      headers: {'X-Authorization': this.token.getToken() }
    });
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({'X-Authorization': this.bearer + this.token.getToken()}, function () {
      _this.stompClient.subscribe(topic, function (sdkEvent: any) {
        _this.onMessageReceived(sdkEvent);
      });
      _this.stompClient.reconnect_delay = 2000;
    });
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt

  _send(message: any, topic: string) {
    console.log("calling logout api via web socket");
    //this.stompClient.send(topic, {'X-Authorization': this.token.getToken()}, JSON.stringify(message));
    this.stompClient.send(topic, {}, JSON.stringify(message));
  }

  onMessageReceived(message: any) {
    const m = message.body;
    console.log(m);
    const chatMessageDto = JSON.parse(m);
    this.messages.push(chatMessageDto);
    console.log(this.messages);
  }
}
