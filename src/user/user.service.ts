import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  getUserByEmail(email: string):Promise<User> {
    return this.prismaService.user.findUnique({
      where: { email }
    });
  }
}
