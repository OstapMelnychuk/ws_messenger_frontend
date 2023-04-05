import {ChatUser} from "./ChatUser";

export class Chat {
  public id: number;
  public chatName: string;
  public chatDescription: string;
  public users: ChatUser[];

  constructor(id: number, chatName: string, chatDescription: string, users: ChatUser[]) {
    this.id = id;
    this.chatName = chatName;
    this.chatDescription = chatDescription;
    this.users = users;
  }
}
