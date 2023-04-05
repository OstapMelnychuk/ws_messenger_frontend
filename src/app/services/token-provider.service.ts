import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenProviderService {

  constructor() { }

  getToken() {
    return localStorage.getItem("ws-messenger-token");
  }

  tokenExpired(token: string) {
    const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
    return (Math.floor((new Date).getTime() / 1000)) >= expiry;
  }

  getUserInfo() {
    const token = this.getToken();
    let payload;
    if (token) {
      payload = token.split(".")[1];
      payload = window.atob(payload);
      return JSON.parse(payload);
    } else {
      return null;
    }
  }
}
