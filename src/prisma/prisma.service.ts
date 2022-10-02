import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor() {
    super({
      datasources: {
        db: {
          url: 'mongodb+srv://admin:admin@cluster0.20kd4zz.mongodb.net/nest?retryWrites=true&w=majority'
        },
      },
    });
  }
}
