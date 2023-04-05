import { Component } from '@angular/core';
import {LoginService} from "../services/login.service";
import {Router} from "@angular/router";
import {NgForm} from "@angular/forms";
import {AuthenticationRequest} from "../models/AuthenticationRequest";
import {Token} from "../models/Token";
import {SignupRequest} from "../models/SignupRequest";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private loginService: LoginService, private router: Router) {
  }

  signup(sendForm : NgForm) {
    const authRequest = new SignupRequest(sendForm.value.email, sendForm.value.password, sendForm.value.nickname);
    this.loginService.register(authRequest).subscribe((res: Token) => {
      if (res != undefined) {
        localStorage.setItem("ws-messenger-token", res.token)
        this.router.navigate(['/chat']);
      }
      console.log(res.token);
    })
  }

  redirectToLogin() {
    this.router.navigate(['/login']);
  }
}
