import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ChatComponent } from './chat/chat.component';
import {FormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { ChatSelectorComponent } from './chat-selector/chat-selector.component';
import {AuthInterceptor} from "./services/auth.interceptor";
import {RouterModule, Routes} from "@angular/router";
import { LoginComponent } from './login/login.component';
import {UnauthorizedService} from "./services/unauthorized.service";
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'chat', component: ChatSelectorComponent},
  { path: 'signup', component: SignupComponent},
];
@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    ChatSelectorComponent,
    LoginComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedService,
      multi: true,
    },],
  bootstrap: [AppComponent],
  exports : [RouterModule]
})
export class AppModule { }
