import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';

import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const userByEmailInDb = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      }
    })

    if (userByEmailInDb) {
      throw new HttpException('user with such email already exists', HttpStatus.BAD_REQUEST);
    }

    const hash = await argon.hash(dto.password);

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        hash,
      },
    });

    delete user.hash;

    return user;
  }

  signin() {
    return {msg: "i've signed in"};
  }
}
