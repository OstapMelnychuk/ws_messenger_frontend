import {Component, OnInit} from '@angular/core';
import {TokenProviderService} from "./services/token-provider.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'ws-messenger';

  public constructor(private tokenService: TokenProviderService, private router: Router) {
  }

  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token != null) {
      // console.log(this.tokenService.getUserInfo().sub);
      if (!this.tokenService.tokenExpired(token)) {
        this.router.navigate(['/chat']);
        return;
      }
    }
    this.router.navigate(['/login']);
  }
}
