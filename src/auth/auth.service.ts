import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import * as argon from 'argon2';

import { AuthDto } from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    try {
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
    } catch (error) { // doesn't catch despite @unique in the model
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException(' Credentials taken');
        }
      }
      throw error;
    }
  }

  signin() {
    return {msg: 'i\'ve signed in'};
  }
}
