import { Injectable } from '@nestjs/common';

@Injectable({})
export class AuthService {
  login() {
    return { msg: "i've signed in"};
  }

  signup() {
    return { msg: "i've signed up"};
  }
}
