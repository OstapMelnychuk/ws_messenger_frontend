import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MessageDto} from "../models/MessageDto";
import {WebsocketSockjsService} from "../services/websocket-sockjs.service";
import {MessageService} from "../services/message.service";
import {TokenProviderService} from "../services/token-provider.service";
import {Router} from "@angular/router";
import {ChatUserService} from "../services/chat-user.service";
import {ChatUser} from "../models/ChatUser";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {
  @Input("chatId") chatId = 0;
  constructor(public sockjsService: WebsocketSockjsService, public messageService: MessageService, private tokenService: TokenProviderService, private router: Router, private chatUserService: ChatUserService) {
  }
  ngOnInit(): void {
    this.messageService.getMessagesByChatId(this.chatId).subscribe((res) => {
      this.sockjsService.messages = res;
    });
    this.sockjsService._connect("/topic/messages/" + this.chatId);
  }

  ngOnDestroy(): void {
    this.sockjsService._disconnect();
  }

  async sendMessage(sendForm : NgForm) {
    let token = this.tokenService.getToken();
    if (token == null || this.tokenService.tokenExpired(token)) {
      this.router.navigate(['/login']);
    }
    let userEmail = this.tokenService.getUserInfo().sub;
    console.log(userEmail);
    let userNickname: string | undefined = "";
    const t = await this.chatUserService.getChatUserByEmail(userEmail).toPromise();
    userNickname = t?.nickname;
    const chatMessageDto = new MessageDto(userNickname, this.chatId, sendForm.value.message);
    this.sockjsService._send(chatMessageDto, "/ws/chat/" + this.chatId);
    console.log(sendForm.value);
  }
}
