import * as argon from 'argon2';
import { ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../user/user.service';
import { AuthDto } from './dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prismaService: PrismaService,
    private userService: UserService,
    private jwt: JwtService,
    private config: ConfigService,
    ) {}

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

    return this.signToken(user.id, user.email);
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

    return this.signToken(user.id, user.email);
  }

  // add to helper file
  async signToken (userId: string, email: string): Promise<{ access_token: string }> {
    const payload = {
      sub: userId,
      email
    };

    const secret = this.config.get('JWT_SECRET');

    const token = await this.jwt.signAsync(payload, { // may get it w/o Async
      expiresIn: '15m',
      secret,
    });

    return {
      access_token: token,
    }
  }
}
