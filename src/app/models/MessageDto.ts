export class MessageDto {
  senderNickname: string | undefined;
  chatId: number;
  message: string;

    constructor(senderNickname: string | undefined, chatId: number, message: string) {
    this.senderNickname = senderNickname;
    this.chatId = chatId;
    this.message = message;
  }
}
