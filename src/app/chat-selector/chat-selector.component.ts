import {Component, OnInit} from '@angular/core';
import {ChatService} from "../services/chat.service";
import {Chat} from "../models/Chat";
import {TokenProviderService} from "../services/token-provider.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-chat-selector',
  templateUrl: './chat-selector.component.html',
  styleUrls: ['./chat-selector.component.css']
})
export class ChatSelectorComponent implements OnInit {
  public chats: Chat[] = [];
  public chatId = 0;
  public chatsLoaded: Promise<boolean> = Promise.resolve(false);
  ngOnInit(): void {
    const token = this.tokenService.getToken();
    if (token == null || this.tokenService.tokenExpired(token)) {
      this.router.navigate(['/login']);
    }

    this.chatService.getChatsByUserEmail(this.tokenService.getUserInfo().sub).subscribe(res => {
      this.chats = res as Chat[];
      this.chatsLoaded = Promise.resolve(true);
      console.log(this.chats);
    });
  }
  constructor(public chatService: ChatService, private tokenService: TokenProviderService, private router: Router) {
  }

  setChatId(chat: Chat) {
    if (this.chatId != 0) {
      this.chatId = 0;
    }
    this.chatId = chat.id;
  }

  setChatIdToZero() {
    this.chatId = 0;
  }
}
