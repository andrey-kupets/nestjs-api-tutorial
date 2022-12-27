import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from "./dto";

@Injectable()
export class UserService {
  constructor(private prismaService: PrismaService) {}

  getUserByEmail(email: string):Promise<User> {
    return this.prismaService.user.findUnique({
      where: { email }
    });
  }

  async editUser(userId: string, dto: EditUserDto) {
    const user = await this.prismaService.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dto,
      },
    });

    delete user.hash;

    return user;
  }
}
