export class SignupRequest {
  private email: string;
  private password: string;
  private nickname: string;

  constructor(email: string, password: string, nickname: string) {
    this.email = email;
    this.password = password;
    this.nickname = nickname;
  }
}
