import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as argon from 'argon2';

import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto';

@Injectable()
export class AuthService {
  constructor(private prismaService: PrismaService, private userService: UserService) {}

  async signup(dto: AuthDto) {
    const signedUpUser = await this.userService.getUserByEmail(dto.email);

    if (signedUpUser) {
      throw new HttpException('Credentials taken', HttpStatus.FORBIDDEN);
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

  async signin(dto: AuthDto) {
    const user = await this.userService.getUserByEmail(dto.email);

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const pwMatches = await argon.verify(user.hash, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    delete user.hash;
    return user;
  }
}
