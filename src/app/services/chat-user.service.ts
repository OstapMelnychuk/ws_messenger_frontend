import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ChatUser} from "../models/ChatUser";
import {async} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ChatUserService {

  private url = "http://localhost:8080/api/v1/chat-user/email/";
  constructor(private http: HttpClient) { }

  getChatUserByEmail(email: string) {
    return this.http.get<ChatUser>(this.url + email);
  }
}
