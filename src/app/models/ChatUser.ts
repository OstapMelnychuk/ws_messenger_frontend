export class ChatUser {
  private id: number;
  private _email: string;
  private _nickname: string;

  constructor(id: number, email: string, nickname: string) {
    this.id = id;
    this._email = email;
    this._nickname = nickname;
  }

  get email(): string {
    return this._email;
  }

  get nickname(): string {
    return this._nickname;
  }
}
