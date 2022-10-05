import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';

import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
      // how to display selected fields
      // select: {
      //   id: true,
      //   email: true,
      //   createdAt: true
      // },
    });

    delete user.hash;

    return user;
  }

  signin() {
    return { msg: "i've signed in"};
  }
}
