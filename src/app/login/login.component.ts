import { Component } from '@angular/core';
import {LoginService} from "../services/login.service";
import {NgForm} from "@angular/forms";
import {AuthenticationRequest} from "../models/AuthenticationRequest";
import {Token} from "../models/Token";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private loginService: LoginService, private router: Router) {
  }

  login(sendForm : NgForm) {
    const authRequest = new AuthenticationRequest(sendForm.value.email, sendForm.value.password);
    console.log(authRequest);
    this.loginService.login(authRequest).subscribe((res: Token) => {
      if (res != undefined) {
        localStorage.setItem("ws-messenger-token", res.token)
        this.router.navigate(['/chat']);
      }
      console.log(res.token);
    })
  }

  redirectToSignup() {
    this.router.navigate(['/signup']);
  }
}
