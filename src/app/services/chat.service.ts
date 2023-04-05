import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Chat} from "../models/Chat";
import {TokenProviderService} from "./token-provider.service";

@Injectable({
  providedIn: 'root'
})
export class ChatService {
  private link = "http://localhost:8080";

  constructor(private http: HttpClient) {
  }

  getChatsByUserEmail(email: string) {
    const url = this.link + "/api/v1/chat/user/email/" + email;
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': 'http://localhost:4200',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      })
    };
    return this.http.get<Chat[]>(url, httpOptions);
    //return this.http.get<Chat[]>(url);

  }
}
