import { Injectable } from '@angular/core';
import {HttpClient, HttpContext} from "@angular/common/http";
import {Token} from "../models/Token";
import {AuthenticationRequest} from "../models/AuthenticationRequest";
import {BYPASS_LOG} from "./auth.interceptor";
import {SignupRequest} from "../models/SignupRequest";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private url = "http://localhost:8080/api/v1/auth";

  constructor(private http: HttpClient) { }

  login(request: AuthenticationRequest) {
    return this.http.post<Token>(this.url + "/authenticate", request, { context: new HttpContext().set(BYPASS_LOG, true) });
  }

  register(request: SignupRequest) {
    return this.http.post<Token>(this.url + "/register", request, { context: new HttpContext().set(BYPASS_LOG, true) });
  }
}
