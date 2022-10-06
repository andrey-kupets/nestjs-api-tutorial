import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';

import * as argon from 'argon2';

import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private userService: UserService) {}

  async signup(dto: AuthDto) {
    const userByEmailInDb = await this.userService.getUserByEmail(dto.email);

    if (userByEmailInDb) {
      throw new HttpException('Credentials taken', HttpStatus.BAD_REQUEST);
    }

    const hash = await argon.hash(dto.password);

    const user = await this.prismaService.user.create({
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
