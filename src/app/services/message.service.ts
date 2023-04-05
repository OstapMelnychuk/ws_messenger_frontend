import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {MessageDto} from "../models/MessageDto";
import {TokenProviderService} from "./token-provider.service";

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  private link = "http://localhost:8080"

  constructor(private http: HttpClient, private tokenService: TokenProviderService) { }

  getMessagesByChatId(chatId: number) {
    const getLink = this.link + "/api/v1/message/chat/" + chatId;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      })
    };
    return this.http.get<MessageDto[]>(getLink, httpOptions);
  }

}
