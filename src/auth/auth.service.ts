import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  signup() {
    return { msg: "i've signed up"};
  }

  signin() {
    return { msg: "i've signed in"};
  }
}
